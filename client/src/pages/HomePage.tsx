import { useEffect, useState, useRef, useCallback } from "react";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getReceivePick } from "api/pickApi";
import { IPaging, IPick } from "atoms/Pick.type";
import Response from "components/MainPage/Response";
import Initial from "components/MainPage/Initial";
import AttendanceModal from "components/modals/AttendanceModal";
import { getAttendance, postAttendance } from "api/attendanceApi";
import Loading from "components/common/Loading";

const Home = () => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<IPaging<IPick[]>>({
      queryKey: ["pick", "receive"],
      queryFn: ({ pageParam = 0 }) => getReceivePick(pageParam as number, 10),
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage.last) {
          return pages.length;
        }
        return undefined;
      },
      initialPageParam: 0,
      refetchInterval: 5000, // 5초마다 새로고침
    });

  const [modalOpen, setModalOpen] = useState(false);
  const [streak, setStreak] = useState(0);
  const observerElem = useRef<HTMLDivElement>(null);
  const scrollPosition = useRef(0);
  const [hasCheckedAttendance, setHasCheckedAttendance] = useState(false);

  const { data: attendance, isLoading: isLoadingAttendance } = useQuery({
    queryKey: ["attendance"],
    queryFn: getAttendance,
    enabled: !hasCheckedAttendance, // 이미 출석 체크를 했으면 쿼리 실행 안함
  });

  const queryClient = useQueryClient();

  const postMutation = useMutation({
    mutationKey: ["postAttendance"],
    mutationFn: postAttendance,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["attendance"] });
      setModalOpen(true);
      setHasCheckedAttendance(true); // 출석 체크 완료 상태로 변경
    },
    onError: (error) => {
      console.log("이미 출석체크 완료");
    },
  });

  useEffect(() => {
    if (attendance && !attendance.todayChecked && !hasCheckedAttendance) {
      postMutation.mutate();
    }
  }, [attendance, hasCheckedAttendance, postMutation]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target && hasNextPage) {
        scrollPosition.current = window.scrollY;
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    const element = observerElem.current;
    const option = { threshold: 1.0 };
    const observer = new IntersectionObserver(handleObserver, option);
    if (element) observer.observe(element);
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [handleObserver]);

  useEffect(() => {
    if (data && !hasNextPage) {
      console.log("조회가 완료되었습니다.");
    }
  }, [data, hasNextPage]);

  useEffect(() => {
    if (!isFetchingNextPage) {
      window.scrollTo(0, scrollPosition.current);
    }
  }, [isFetchingNextPage]);

  if (isError) return <div>에러 발생...</div>;

  if (isLoading || isLoadingAttendance) {
    return <Loading />;
  }

  return (
    <div className="m-6">
      {data?.pages.flatMap((page) => page.content).length ? (
        <Response
          picks={data.pages.flatMap((page) => page.content)}
          isLoading={isLoading || isFetchingNextPage}
        />
      ) : (
        <Initial />
      )}
      <div ref={observerElem} />
      {isFetchingNextPage && <div>로딩 중...</div>}
      {modalOpen && <AttendanceModal date={streak} onClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default Home;
