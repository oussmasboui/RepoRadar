import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa';

/**
 * Container is a styled component that serves as the header container.
 * It aligns its children vertically and sets the background color.
 */
export const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--header);
  padding: 11px 16px;
`;

/**
 * GitHubLogo is a styled component that renders the GitHub logo icon.
 * It sets the fill color, width, and height of the icon.
 * The flex-shrink property prevents the icon from shrinking when the header is too small.
 */
export const GitHubLogo = styled(FaGithub)`
  fill: var(--logo);
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;

/**
 * SearchForm is a styled form component used for search input.
 * It adds padding and sets the width to 100%.
 * The input field within the form is styled to have rounded corners, padding, and color.
 * Focus styles include adjusting the width for better user experience.
 */
export const SearchForm = styled.form`
  padding-left: 16px;
  width: 100%;
  
  input {
    background: var(--search);
    outline: none;
    border-radius: 6px;
    padding: 7px 12px;
    width: 100%;
    color: var(--primary);
    
    &:focus {
      width: 318px;
    }

    transition: width 0.2s ease-out, color 0.2s ease-out;
  }
`;
