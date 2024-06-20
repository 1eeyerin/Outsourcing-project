import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addFeedback,
  deleteFeedback,
  getFeedback,
  getFeedbackPassword,
  getFeedbacks,
  updateFeedback
} from '@/supabase/feedback';
import { QUERY_KEYS } from './constants';

export const useGetFeedbacks = () => {
  return useQuery({
    queryKey: QUERY_KEYS.FEEDBACKS,
    queryFn: getFeedbacks
  });
};

export const useGetFeedback = (id) => {
  return useQuery({
    queryKey: QUERY_KEYS.FEEDBACK(id),
    queryFn: () => getFeedback(id),
    select: (data) => data[0]
  });
};

export const useGetFeedbackFromQueries = (id) => {
  const queryClient = useQueryClient();
  return queryClient.getQueryData(QUERY_KEYS.FEEDBACK(id))?.[0] || {};
};

export const useGetFeedbackPassword = (id) => {
  return useQuery({
    queryKey: QUERY_KEYS.FEEDBACK_PASSWORD_CHECK(id),
    queryFn: () => getFeedbackPassword(id),
    select: (data) => data[0]?.password
  });
};

export const useAddFeedback = (options) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (content) => addFeedback(content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.FEEDBACKS });
      alert('작성이 완료되었어요');
      navigate('/feedback');
    },
    ...options
  });
};

export const useUpdateFeedback = (id) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content) => updateFeedback({ id, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.FEEDBACK(id) });
      alert('수정되었어요');
      navigate(`/feedback/${id}`);
    },
    enabled: !!id
  });
};

export const useDeleteFeedback = (id) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteFeedback(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.FEEDBACKS });
      alert('삭제되었어요.');
      navigate('/feedback');
    }
  });
};
