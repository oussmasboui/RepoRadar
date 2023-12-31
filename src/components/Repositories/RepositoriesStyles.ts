// Styled components for repository details display

// TopSide and BottomSide components wrap repository header and details respectively.
// RepositoryIcon, StarIcon, and ForkIcon are styled components for icons.
import styled, { css } from 'styled-components';
import { RiBookMarkLine, RiStarLine } from 'react-icons/ri';
import { AiOutlineFork } from 'react-icons/ai';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  // if the description is too long and it's using two collumns (see media query for the div in RepositoriesPageprofileStyle.ts ) TopSide and BottomSide will take the same space there for it matchs the space of the other side.
  justify-content: space-between;
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: 6px;
`;

export const TopSide = styled.div`
  header {
    display: flex;
    align-items: center;

    > a {
      margin-left: 8px;
      font-size: 14px;
      font-weight: 600;
      color: var(--link);

      text-decoration: none;

      &:hover,
      &:focus {
        text-decoration: underline;
      }
    }
  }

  > p {
    margin: 8px 0 16px;
    font-size: 12px;
    color: var(--gray);
    letter-spacing: 0.1px;
  }
`;

export const BottomSide = styled.div`
  > ul {
    display: flex;
    align-items: center;

    > li {
      display: flex;
      align-items: center;
      margin-right: 16px;

      > span {
        margin-left: 5px;
        font-size: 12px;
        color: var(--gray);
      }
    }

    .language {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      flex-shrink: 0;

      &.other {
        background: var(--other-language);
      }
      &.javascript {
        background: var(--javascript);
      }
      &.typescript {
        background: var(--typescript);
      }
      &.php {
        background: var(--html);
      }
      &.php {
        background: var(--php);
      }
      &.css {
        background: var(--css);
      }
    }
  }
`;

// custom styles to pass to all icons
const iconCSS = css`
  width: 16px;
  height: 16px;
  fill: var(--icon);
  flex-shrink: 0;
`;

export const RepositoryIcon = styled(RiBookMarkLine)`
  ${iconCSS}
`;

export const StarIcon = styled(RiStarLine)`
  ${iconCSS}
`;

export const ForkIcon = styled(AiOutlineFork)`
  ${iconCSS}
`;