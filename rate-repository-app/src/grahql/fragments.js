import { gql } from "@apollo/client";

export const REPOSITORY_DETAILS = gql`
  fragment RepositoryDetails on Repository {
    fullName
    id
    description
    language
    ownerAvatarUrl
    ratingAverage
    reviewCount
    stargazersCount
    forksCount
    url
  }
`;
