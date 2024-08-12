import RankContent from 'components/RankingPage/RankContent';
import { getRankList } from 'api/rankApi';
import { useQuery } from '@tanstack/react-query';
import { IRank, IRankList } from 'atoms/Rank.type';
import Loading from 'components/common/Loading';

const rankName = [
  'topMessageReceivers',
  'topMessageSenders',
  'topPickReceivers',
  'topPickSenders',
  'topReservePickcoUsers',
  'topSpendPickcoUsers',
] as const;

const Ranking = () => {
  const { data: rankList, isLoading } = useQuery<IRank>({
    queryKey: ['rank'],
    queryFn: async () => await getRankList(),
  });

  console.log('rankList', rankList, isLoading);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="m-6">
      {rankList &&
        rankName.map((key) => {
          const rankItem: IRankList[] = rankList[key];
          return <RankContent key={key} title={key} rankInfo={rankItem} />;
        })}
    </div>
  );
};

export default Ranking;
