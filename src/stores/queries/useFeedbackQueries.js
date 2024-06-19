import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addFeedback, deleteFeedback, getFeedback, getFeedbackPassword, updateFeedback } from '@/supabase/feedback';

export const useGetFeedback = (id) => {
  return useQuery({
    queryKey: ['feedback', id],
    queryFn: () => getFeedback(117),
    select: (data) => data[0]
  });
};

export const useGetFeedbackFromQueries = (id) => {
  const queryClient = useQueryClient();
  return queryClient.getQueryData(['feedback', id])?.[0] || {};
};

export const useGetFeedbackPassword = (id) => {
  return useQuery({
    queryKey: ['feedback-password', id],
    queryFn: () => getFeedbackPassword(id),
    select: (data) => data[0]?.password
  });
};

export const useAddFeedback = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content) => addFeedback(content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedback'] });
      alert('작성이 완료되었어요');
    }
  });
};

export const useUpdateFeedback = (id) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content) => updateFeedback({ id: 117, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedback', id] });
      alert('수정되었어요');
      navigate('/feedback/117');
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
      queryClient.invalidateQueries({ queryKey: ['feedback'] });
      alert('삭제되었어요.');
      navigate('/feedback');
    }
  });
};
