import { CommentFull } from '../../../store/reducer/entities/types';

type SortComments = (comments?: Array<CommentFull>) => Array<CommentFull>;

const sortComments: SortComments = comments => (comments || []).sort((a, b) => {
  const firstDate = new Date(a.date_log);
  const secondDate = new Date(b.date_log);

  if (firstDate > secondDate) return 1;
  if (firstDate < secondDate) return -1;

  return 0;
});

export default sortComments;
