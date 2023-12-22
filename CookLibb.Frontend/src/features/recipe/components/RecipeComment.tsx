import styled from 'styled-components';
import { IComment } from '../../../interfaces/IComment';
import { Avatar } from '../../../ui/Avatar';
import Heading from '../../../ui/Heading';
import { UserRoles, dateOptions } from '../../../utils/constants';
import { AiFillDelete } from 'react-icons/ai';
import Modal from '../../../ui/Modal';
import DeleteCommentModal from './DeleteCommentModal';
import { useUserContext } from '../../../contexts/UserContext';
import UserInformationModal from '../../admin/components/UserInformationModal';

const RecipeCommentLayout = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid var(--color-grey-200);
`;

const RecipeCommentHeader = styled.div`
  display: flex;
  border-bottom: 2px solid var(--color-grey-200);
  padding: 1rem;
  width: 100%;
`;

const RecipeCommentHeaderRight = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
`;

const DeleteIconActive = styled(AiFillDelete)`
  height: 2.5rem;
  width: 2.5rem;
  fill: var(--color-grey-700);
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    fill: var(--color-red-800);
  }
`;

const DeleteIconDisabled = styled(AiFillDelete)`
  height: 2.5rem;
  width: 2.5rem;
  fill: var(--color-grey-300);
`;

const RecipeCommentUser = styled.div`
  display: flex;
  gap: 1rem;
  margin-right: auto;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;

  &:hover {
    background-color: var(--color-grey-300);
  }
`;

const RecipeCommentDate = styled.span`
  margin-left: auto;
`;

const RecipeCommentBody = styled.div`
  padding: 1rem;
  background-color: var(--color-grey-50);
`;

const RecipeCommentDescription = styled.span`
  padding: 0.5rem 0;
`;

const RecipeCommentBodyHeader = styled.p`
  font-weight: 500;
`;

interface RecipeCommentProps {
  comment: IComment;
}

function RecipeComment({ comment }: RecipeCommentProps) {
  const userContext = useUserContext();
  const user = userContext.user;
  return (
    <RecipeCommentLayout>
      <RecipeCommentHeader>
        <UserInformationModal user={user}>
          <RecipeCommentUser>
            <Avatar src={comment.author.avatarUrl} />
            <Heading as='h3'>{comment.author.username}</Heading>
          </RecipeCommentUser>
        </UserInformationModal>
        <RecipeCommentHeaderRight>
          <RecipeCommentDate>
            {new Date(comment.creationDate).toLocaleString(
              'pl-PL',
              dateOptions
            )}
          </RecipeCommentDate>
          {user?.id === comment.author.id || user?.role === UserRoles.Admin ? (
            <Modal>
              <Modal.Open opens='delete-comment'>
                <DeleteIconActive />
              </Modal.Open>
              <Modal.Window name='delete-comment'>
                <DeleteCommentModal comment={comment} />
              </Modal.Window>
            </Modal>
          ) : (
            <DeleteIconDisabled />
          )}
        </RecipeCommentHeaderRight>
      </RecipeCommentHeader>
      <RecipeCommentBody>
        <RecipeCommentBodyHeader>Treść komentarza:</RecipeCommentBodyHeader>
        <RecipeCommentDescription></RecipeCommentDescription>
        {comment.description}
      </RecipeCommentBody>
    </RecipeCommentLayout>
  );
}

export default RecipeComment;
