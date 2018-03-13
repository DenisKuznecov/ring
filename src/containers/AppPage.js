import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { setData } from '../actions/appActions';

import { ColumnWrap } from '../components';

const dummyData = [
  {
    id: 1,
    title: 'Column',
    onDelete: () => true,
    tickets: [
      {
        onDelete: () => true,
        descr: 'Ticketadkaj',
        id: 1,
      },
      {
        onDelete: () => true,
        descr: 'Ticketadkaj dka ksjdakjshd kjadslhaks jdhk jashdk jhak jsdkjhasj hdkajsh jdhakjs hdkj ahskjhdjkahsj kdhajk s',
        id: 2,
      },
      {
        onDelete: () => true,
        descr: 'Ticketadkaj dka ksjdakjshd kjadslhaks jdhk jashdk jhak jsdkjhasj hdkajsh jdhakjs hdkj ahskjhdjkahsj kdhajk s',
        id: 3,
      },
      {
        onDelete: () => true,
        descr: 'Ticketadkaj dka ksjdakjshd kjadslhaks jdhk jashdk jhak jsdkjhasj hdkajsh jdhakjs hdkj ahskjhdjkahsj kdhajk s',
        id: 4,
      },
    ],
  },
  {
    id: 2,
    title: 'Column',
    onDelete: () => true,
    tickets: [
      {
        onDelete: () => true,
        descr: 'Ticketadkaj dka ksjdakjshd kjadslhaks jdhk jashdk jhak jsdkjhasj hdkajsh jdhakjs hdkj ahskjhdjkahsj kdhajk s',
        id: 1,
      },
      {
        onDelete: () => true,
        descr: 'Ticketadkaj dka ksjdakjshd kjadslhaks jdhk jashdk jhak jsdkjhasj hdkajsh jdhakjs hdkj ahskjhdjkahsj kdhajk s',
        id: 2,
      },
      {
        onDelete: () => true,
        descr: 'Ticketadkaj dka ksjdakjshd kjadslhaks jdhk jashdk jhak jsdkjhasj hdkajsh jdhakjs hdkj ahskjhdjkahsj kdhajk s',
        id: 3,
      },
      {
        onDelete: () => true,
        descr: 'Ticketadkaj dka ksjdakjshd kjadslhaks jdhk jashdk jhak jsdkjhasj hdkajsh jdhakjs hdkj ahskjhdjkahsj kdhajk s',
        id: 4,
      },
    ],
  },
  {
    id: 3,
    title: 'Column',
    onDelete: () => true,
    tickets: [
      {
        onDelete: () => true,
        descr: 'Ticketadkaj',
        id: 1,
      },
      {
        onDelete: () => true,
        descr: 'Ticketadkaj dka ksjdakjshd kjadslhaks jdhk jashdk jhak jsdkjhasj hdkajsh jdhakjs hdkj ahskjhdjkahsj kdhajk s',
        id: 2,
      },
      {
        onDelete: () => true,
        descr: 'Ticketadkaj dka ksjdakjshd kjadslhaks jdhk jashdk jhak jsdkjhasj hdkajsh jdhakjs hdkj ahskjhdjkahsj kdhajk s',
        id: 3,
      },
      {
        onDelete: () => true,
        descr: 'Ticketadkaj dka ksjdakjshd kjadslhaks jdhk jashdk jhak jsdkjhasj hdkajsh jdhakjs hdkj ahskjhdjkahsj kdhajk s',
        id: 4,
      },
    ],
  },
  {
    id: 4,
    title: 'Column',
    onDelete: () => true,
    tickets: [
      {
        onDelete: () => true,
        descr: 'Ticketadkaj',
        id: 1,
      },
      {
        onDelete: () => true,
        descr: 'Ticketadkaj dka ksjdakjshd kjadslhaks jdhk jashdk jhak jsdkjhasj hdkajsh jdhakjs hdkj ahskjhdjkahsj kdhajk s',
        id: 2,
      },
      {
        onDelete: () => true,
        descr: 'Ticketadkaj dka ksjdakjshd kjadslhaks jdhk jashdk jhak jsdkjhasj hdkajsh jdhakjs hdkj ahskjhdjkahsj kdhajk s',
        id: 3,
      },
      {
        onDelete: () => true,
        descr: 'Ticketadkaj dka ksjdakjshd kjadslhaks jdhk jashdk jhak jsdkjhasj hdkajsh jdhakjs hdkj ahskjhdjkahsj kdhajk s',
        id: 4,
      },
    ],
  },
  {
    id: 5,
    title: 'Column',
    onDelete: () => true,
    tickets: [
      {
        onDelete: () => true,
        descr: 'Ticketadkaj',
        id: 1,
      },
      {
        onDelete: () => true,
        descr: 'Ticketadkaj dka ksjdakjshd kjadslhaks jdhk jashdk jhak jsdkjhasj hdkajsh jdhakjs hdkj ahskjhdjkahsj kdhajk s',
        id: 2,
      },
      {
        onDelete: () => true,
        descr: 'Ticketadkaj dka ksjdakjshd kjadslhaks jdhk jashdk jhak jsdkjhasj hdkajsh jdhakjs hdkj ahskjhdjkahsj kdhajk s',
        id: 3,
      },
      {
        onDelete: () => true,
        descr: 'Ticketadkaj dka ksjdakjshd kjadslhaks jdhk jashdk jhak jsdkjhasj hdkajsh jdhakjs hdkj ahskjhdjkahsj kdhajk s',
        id: 4,
      },
    ],
  },
];

class AppPage extends Component {
  constructor(props){
    super(props);
  }

  static propTypes = {}

  render() {
    return (
      <div className="app-container">
        <div className="columns-list">
          {
            dummyData.map(item => (
              <ColumnWrap
                key={item.id}
                { ...item }
              />
            ))
          }
        </div>
        <input
          className="add-column-input"
          placeholder="Add a list..."
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  state
})

export default connect(mapStateToProps)(AppPage);
