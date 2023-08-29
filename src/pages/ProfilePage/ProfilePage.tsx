// Import necessary dependencies and components
import React, { FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Import styles and components from other files
import {
  Container,
  Main,
  LeftSide,
  RightSide,
  RepositoriesPage,
  RepositoryIcon,
  Tab,
  Select,
  Input,
  SearchBarContainer
} from './profilePageStyles';

// Import custom hook and types
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { APIRepo, APIUser } from '../../@types/customTypes';
import ProfileData from '../../components/ProfileInfo/ProfileInfo';
import RepositoryCard from '../../components/Repositories/Repositories';
import { formatDate } from '../../shared/datesFormatter';

// Define the structure of the data fetched from APIs
interface Data {
  user?: APIUser;
  repos?: APIRepo[];
  error?: string;
}

// Define the main component
export const ProfilePage: FC = () => {
  // Check if the user is logged in
  const [isLoggedIn] = useLocalStorage('isLoggedIn', () => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      return true;
    } else {
      return false;
    }
  });

  const navigate = useNavigate();

  // Redirect to login page if not logged in
  if (isLoggedIn === false) {
    navigate('/login');
  }

  // Get the username from the URL
  const { username = 'oussmasboui' } = useParams();

  // State to hold fetched data
  const [data, setData] = useState<Data>();

  // State for filtering repositories by name
  const [filterText, setFilterText] = useState('');

  // State for search query input
  const [searchQuery, setSearchQuery] = useState<string>('');

  // State for selected programming language filter
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');

  // State for sorting repositories
  const [sortBy, setSortBy] = useState<'' | 'stargazers' | 'name' | 'updated'>('');

  // Fetch user and repositories data from GitHub APIs
  useEffect(() => {
    Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos`)
    ]).then(async responses => {
          const [userResponse, reposResponse] = responses;
          if (userResponse.status === 404) {
            setData({ error: 'User not found!' });
            return;
          }
          const user = await userResponse.json();
          const repos = await reposResponse.json();

          setData({
            user,
            repos
          });
        });
  }, [username]);

  // Extract unique programming languages from fetched repositories
  const programmingLanguages: string[] = Array.from(
    new Set(data?.repos?.map(repo => repo.language).filter(Boolean))
  );

  // Handle changes in the search input
  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Handle changes in the selected programming language filter
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
  };

  // Filter and sort repositories based on search, language, and sorting options
  const filteredRepositories = data?.repos?.filter((repo) => {
    const nameMatch = repo.name.toLowerCase().includes(searchQuery.toLowerCase());
    const languageMatch = selectedLanguage ? repo.language === selectedLanguage : true;
    return nameMatch && languageMatch;
  }) ?? [];

  const sortedRepositories = [...filteredRepositories].sort((a, b) => {
    if (sortBy === 'stargazers') {
      return b.stargazers_count - a.stargazers_count;
    } else if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'updated') {
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    }
    return 0;
  });

  // Render error message if user not found
  if (data?.error) {
    return <h1>{data.error}</h1>;
  }

  // Render loading message while data is being fetched
  if (!data?.user || !data?.repos) {
    return <h1>Loading...</h1>;
  }

  // Component to display repository tab content
  const TabContent: FC = () => (
    <div className='content'>
      <RepositoryIcon />
      <span className='label'>Repositories</span>
      <span className='number'>{data.user?.public_repos}</span>
    </div>
  );

  // Render the main profile page
  return (
    <Container>
      <Tab className='desktop'>
        <div className='wrapper'>
          <span className='offset' />
          <TabContent />
        </div>
      </Tab>
      <Main>
        <LeftSide>
          <ProfileData
            username={data.user.login}
            name={data.user.name}
            avatarUrl={data.user.avatar_url}
            followers={data.user.followers}
            following={data.user.following}
            company={data.user.company}
            location={data.user.location}
            email={data.user.email}
            blog={data.user.blog}
          />
        </LeftSide>
        <RightSide>
          <Tab className='mobile'>
            <TabContent />
            <span className='line'></span>
          </Tab>
          <br />
          <SearchBarContainer>
            {/* Input for repository name search */}
            <Input
              type="text"
              placeholder="Search Repository ..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
            {/* Dropdown for selecting programming language */}
            <Select
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              <option value="">Languages</option>
              {programmingLanguages.map(language => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </Select>
            {/* Dropdown for sorting options */}
            <Select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as 'stargazers' | 'name' | 'updated')}
            >
              <option value="">Sort</option>
              <option value="stargazers">Stars</option>
              <option value="name">Name</option>
              <option value="updated">Update date</option>
            </Select>
          </SearchBarContainer>
          <RepositoriesPage>
            <div>
              {/* Render filtered and sorted repositories */}
              {sortedRepositories
                .filter(repo => repo.name.toLowerCase().startsWith(filterText.toLowerCase()))
                .map(repo => (
                  <RepositoryCard
                    key={repo.name}
                    username={repo.owner.login}
                    reponame={repo.name}
                    description={repo.description}
                    language={repo.language}
                    stars={repo.stargazers_count}
                    forks={repo.forks}
                    updatedAt={formatDate(repo.updated_at)}
                  />
                ))
              }
            </div>
          </RepositoriesPage>
        </RightSide>
      </Main>
    </Container>
  );
};

export default ProfilePage;