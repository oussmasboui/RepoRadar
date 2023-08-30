import React from 'react';

/**Import testing library */
import { render, fireEvent,screen  } from '@testing-library/react';
import { useNavigate } from 'react-router-dom'; // Mock this module
import LoginPage from '../../pages/LoginPage/LoginPage';
import ProfileData from '../ProfileInfo/ProfileInfo';

/** Import axios for http request */
import axios from 'axios';
/** Import axios mock to avoid many API calls during testing */
import Repositories from '../Repositories/Repositories';
/** Example Object to mock API calls */
import Header from '../Header/Header';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
  }));
  
  describe('Header component', () => {
    it('renders without errors', () => {
      render(<Header />);
    });
    it('navigates to the correct URL on form submission', () => {
        const mockNavigate = jest.fn();
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    
        const { getByPlaceholderText } = render(<Header />);
        const input = getByPlaceholderText('Enter Username or Username/Repository Name...');
        const form = input.closest('form')!; // Assert that the form is not null
    
        fireEvent.change(input, { target: { value: 'oussmasboui' } });
        fireEvent.submit(form);
    
        expect(mockNavigate).toHaveBeenCalledWith('/oussmasboui');
      });
    });
    describe('ProfileData component', () => {
        const props = {
          username: 'oussmasboui',
          name: 'oussema sboui',
          avatarUrl: 'https://example.com/avatar.jpg',
          followers: 1,
          following: 1,
          company: 'esprit',
          location: 'tunisia',
          email: 'oussama.sboui@esprit.tn',
          blog: 'https://oussamasboui.com',
        };
      
        it('renders user data', () => {
          render(<ProfileData {...props} />);
      
          const usernameElement = screen.getByText(/oussmasboui/i);
          const nameElement = screen.getByText(/oussema sboui/i);
          const followersElement = screen.queryByText(/1 followers/i); 
          const followingElement = screen.queryByText(/1 following/i); 
          const companyElement = screen.queryAllByText(/esprit/i); // Query all company elements
          const locationElement = screen.getByText(/tunisia/i);
          const emailElement = screen.queryAllByText(/oussama.sboui@esprit.tn/i); // Query all email elements
          const blogElement = screen.getByText(/https:\/\/oussamasboui\.com/i);
      
          expect(usernameElement).toBeInTheDocument();
          expect(nameElement).toBeInTheDocument();
          expect(followersElement).not.toBeInTheDocument(); 
          expect(followingElement).not.toBeInTheDocument(); 
          expect(companyElement.filter(element => element.textContent === "esprit").length).toBe(1);
          expect(locationElement).toBeInTheDocument();
          expect(emailElement.filter(element => element.textContent === "oussama.sboui@esprit.tn").length).toBe(1);
          expect(blogElement).toBeInTheDocument();
        });
      
        it('does not render optional fields when not provided', () => {
          const propsWithoutOptionalFields = {
            ...props,
            company: '',
            location: '',
            email: '',
            blog: '',
          };
      
          render(<ProfileData {...propsWithoutOptionalFields} />);
      
          const companyElement = screen.queryByText(/esprit/i);
          const locationElement = screen.queryByText(/tunisia/i);
          const emailElement = screen.queryByText(/oussama.sboui@esprit.tn/i);
          const blogElement = screen.queryByText(/https:\/\/oussamasboui\.com/i);
      
          expect(companyElement).not.toBeInTheDocument();
          expect(locationElement).not.toBeInTheDocument();
          expect(emailElement).not.toBeInTheDocument();
          expect(blogElement).not.toBeInTheDocument();
        });
      });

      describe('Repositories component', () => {
        const Props = {
          username: 'oussmasboui',
          reponame: 'RepoRadar ',
          description: 'Repository description',
          language: 'TypeScript ',
          stars: 100,
          forks: 50,
          updatedAt: '2023-08-29',
        };
      
        it('renders repository details correctly', () => {
            render(
              <MemoryRouter>
                <Repositories {...Props} />
              </MemoryRouter>
            );
        
            const repoNameLink = screen.getByText(/RepoRadar/); 
            const descriptionElement = screen.getByText(/Repository description/);
            const languageElement = screen.getByText(/TypeScript/); 
            const starsElement = screen.getByText('100');
            const forksElement = screen.getByText('50');
            const updatedAtElement = screen.getByText('2023-08-29');
          
            expect(repoNameLink).toBeInTheDocument();
            expect(descriptionElement).toBeInTheDocument();
            expect(languageElement).toBeInTheDocument();
            expect(starsElement).toBeInTheDocument();
            expect(forksElement).toBeInTheDocument();
            expect(updatedAtElement).toBeInTheDocument();
          });
      });