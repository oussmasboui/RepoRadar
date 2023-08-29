/**
 * @description: Repositories component is used to display the repository details in a card. The component is used in the RepositoryList component to display the list of RepositoriesPagefor a user.
 *
 * @returns: JSX.Element Repositories component with: Container is used to wrap the entire component. Flex is used to align the component. Avatar is used to display the repository avatar. Row is used to display the repository data. Column is used to display the repository data.
 *
 * @interface Props ( in Typescript for an element to receive props, an interface must be defined ). Decscription and language are optional fields as they are not always provided/published by the user.
 *
 * @props username: username of the user.
 * @props reponame: name of the repository.
 * @props description: description of the repository.
 * @props language: language of the repository.
 * @props stars: number of stars of the repository.
 * @props forks: number of forks of the repository.
 * @memberof Repositories
 * @component
 * @example
*/


import { FC } from 'react';
import { Link } from 'react-router-dom';

import {
  Container,
  TopSide,
  RepositoryIcon,
  BottomSide,
  StarIcon,
  ForkIcon
} from './RepositoriesStyles';

interface Props {
  username: string;
  reponame: string;
  description?: string;
  language?: string;
  stars: number;
  forks: number;
  updatedAt: string;
}

const Repositories: FC<Props> = ({
  username,
  reponame,
  description,
  language,
  stars,
  forks,
  updatedAt
}) => {
  /**
   * @description: languageClass() is used in the CSS to change the color of the language icon. If the language is not provided, the icon color will be 'other' which is the default color of the icon assigned in the CSS.
   * @returns: string
   * @memberof Repositories
   * @param {string} language
   */
  const languageClass = language ? language.toLowerCase() : 'other';

  return (
    <Container>
      <TopSide>
        <header>
          <RepositoryIcon />
          {/* Link leads to internal route page to show the repository details */}
          <Link to={`/${username}/${reponame}`}>{reponame}</Link>
        </header>
        <p>{description}</p>
      </TopSide>

      <BottomSide>
        <ul>
          <li>
            <span>{updatedAt}</span>
          </li>
          {language &&
            <li>
              <div className={`language ${languageClass}`} />
              <span> {language}</span>
            </li>
          }
          <li>
            <StarIcon />
            <span>{stars}</span>
          </li>
          <li>
            <ForkIcon />
            <span>{forks}</span>
          </li>
        </ul>
      </BottomSide>
    </Container>
  );
};

export default Repositories;