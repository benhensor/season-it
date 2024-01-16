import React from 'react';
import styled from 'styled-components';

const Message = styled.p`
  text-align: left;
  height: 4.3rem;
  font-size: 1.2rem;
  font-weight: 300;
  padding: 1rem 0;
  color: #eee;
`;

const Highlight = styled.span`
  font-weight: bold;
  color: #2cff02;
`;

const Error = styled.span`
  color: #FF0000;
`;

export const Messages = ({ type, currentMonth, selectedMonth, itemName, produceType }) => {
  let message;

  switch (type) {
    case 'default':
      message = <Message>Select an option above</Message>;
      break;
    case 'current':
      message = <Message>Seasonal Produce for <Highlight>{currentMonth}</Highlight></Message>;
      break;
    case 'month':
      message = <Message>Seasonal Produce for <Highlight>{selectedMonth}</Highlight></Message>;
      break;
    case 'filter':
      message = <Message><Highlight>{produceType}</Highlight> in season during {selectedMonth}</Message>;
      break;
    case 'addedEndsInS':
      message = <Message><Highlight>{itemName}</Highlight> have been added to the shopping list!</Message>;
      break;
    case 'addedNoS':
      message = <Message><Highlight>{itemName}</Highlight> has been added to the shopping list!</Message>;
      break;
    case 'emptyList':
      message = <Message>Shopping list is empty</Message>;
      break;
    case 'shoppingList':
      message = <Message>Shopping List</Message>;
      break;
    case 'duplicateEndsInS':
      message = <Message><Error>{itemName}</Error> are already in the shopping list!</Message>;
      break;
    case 'duplicateNoS':
      message = <Message><Error>{itemName}</Error> is already in the shopping list!</Message>;
      break;
    case 'errorEndsInS':
      message = <Message><Error>{itemName}</Error> are not in season!</Message>;
      break;
    case 'errorNoS':
      message = <Message><Error>{itemName}</Error> is not in season!</Message>;
      break;
    default:
      message = null;
      break;
  }

  return message;
};

export default Messages;
