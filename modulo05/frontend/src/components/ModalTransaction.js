import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function ModalTransaction({
  showModal,
  isOpen,
  selectedTransaction,
}) {
  const {
    type,
    description,
    category,
    value,
    yearMonthDay,
  } = selectedTransaction;
  const { flexStyle, header, button, hr } = styles;

  const [typeTransaction, setTypeTransaction] = React.useState('');
  const [descriptionTransaction, setDescriptionTransaction] = React.useState(
    ''
  );
  const [categoryTransaction, setCategoryTransaction] = React.useState('');
  const [valueTransaction, setValueTransaction] = React.useState(0);
  const [yearMonthDayTransaction, setYearMonthDayTransaction] = React.useState(
    ''
  );

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.addEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      showModal(false);
      setTypeTransaction('');
    }
  };

  const handleModalClose = () => {
    showModal(false);
    setTypeTransaction('');
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = {
      type: typeTransaction,
      description: descriptionTransaction,
      category: categoryTransaction,
      value: valueTransaction,
      yearMonthDay: yearMonthDayTransaction,
    };
    console.log(formData);
    // onSave(formData);
  };

  return (
    <div>
      <Modal isOpen={isOpen} style={modalStyle}>
        <div style={header}>
          <h5>Novo lançamento {typeTransaction}</h5>
          <button style={button} onClick={handleModalClose}>
            X
          </button>
        </div>
        <hr style={hr} />

        <form onSubmit={handleFormSubmit}>
          <div style={flexStyle}>
            <p>
              <label>
                <input
                  className="with-gap"
                  name="inOut"
                  type="radio"
                  value="-"
                  // checked={type === '-' ? true : false}
                  onClick={(click) => setTypeTransaction(click.target.value)}
                />
                <span>Despesa</span>
              </label>
            </p>
            <p>
              <label>
                <input
                  className="with-gap"
                  name="inOut"
                  type="radio"
                  value="+"
                  // checked={type === '+' ? true : false}
                  onClick={(click) => setTypeTransaction(click.target.value)}
                />
                <span>Receita</span>
              </label>
            </p>
          </div>

          <div className="input-field">
            <input
              id="description"
              type="text"
              className="validate"
              value={description}
              onChange={(text) => setDescriptionTransaction(text.target.value)}
            />
            <label htmlFor="description">Descrição</label>
          </div>

          <div className="input-field">
            <input
              id="category"
              type="text"
              className="validate"
              value={category}
              onChange={(text) => setCategoryTransaction(text.target.value)}
            />
            <label htmlFor="category">Categoria</label>
          </div>

          <div style={flexStyle}>
            <div
              className="input-field"
              style={{ width: '100%', marginRight: '5px' }}
            >
              <input
                id="value"
                type="text"
                className="validate"
                value={value}
                onChange={(text) => setValueTransaction(text.target.value)}
              />
              <label htmlFor="value">Valor</label>
            </div>
            <div
              className="input-field"
              style={{ width: '100%', marginLeft: '5px' }}
            >
              <input
                id="yearMonthDay"
                type="date"
                className="validate"
                value={yearMonthDay}
                onChange={(text) =>
                  setYearMonthDayTransaction(text.target.value)
                }
              />
              <label htmlFor="yearMonthDay">Data</label>
            </div>
          </div>

          <button
            type="submit"
            className="waves-effect waves-light btn right"
            disabled={typeTransaction.trim() === ''}
            onChange={null}
          >
            <i className="material-icons left">save</i>salvar
          </button>
        </form>
      </Modal>
    </div>
  );
}

const styles = {
  flexStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: '10px 0',
  },
  header: {
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '1.25rem',
    borderRadius: '50%',
    cursor: 'pointer',
  },
  hr: {
    border: 0,
    height: '1px',
    backgroundImage:
      'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))',
  },
};

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: '70%',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: { zIndex: 1 },
};
