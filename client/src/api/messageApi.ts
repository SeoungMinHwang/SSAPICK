import instance from 'api/clientApi';
import { IMessage } from 'atoms/Message.type';

// 받은 메시지 조회
export const getReceivedMessages = async (): Promise<IMessage[]> => {
  const {
    data: { success, message, data },
  } = await instance.get('/message/receive');

  if (!success) {
    throw new Error(message);
  }

  return data;
};

// 보낸 메시지 조회
export const getSendMessages = async (): Promise<IMessage[]> => {
  const {
    data: { success, message, data },
  } = await instance.get('/message/send');

  if (!success) {
    throw new Error(message);
  }

  return data;
};

// 받은 메시지 삭제
export const deleteReceivedMessage = async (messageId: number): Promise<void> => {
  await instance.delete(`/message/${messageId}/receive`);
};

// 보낸 메시지 삭제 
export const deleteSendMessage = async (messageId: number): Promise<void> => {
  await instance.delete(`/message/${messageId}/send`);
};