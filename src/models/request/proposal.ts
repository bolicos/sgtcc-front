export type ProposalRequest = {
  author: number;
  leader: number;
  title: string;
};

export type ProposalEditRequest = {
  id: number;
  leader: number;
  title: string;
};
