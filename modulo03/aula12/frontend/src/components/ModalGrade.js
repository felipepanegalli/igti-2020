import React from 'react';
import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import * as api from '../api/apiService';

Modal.setAppElement('#root');

export default function ModalGrade({ onSave, onClose, selectedGrade }) {
  const { id, student, subject, type } = selectedGrade;
  const { flexStyle, titleStyle, flexStartStyle, errorMessageStyle } = styles;
  const [gradeValue, setGradeValue] = useState(selectedGrade.value);
  const [gradeValidation, setGradeValidation] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const getValidation = async () => {
      const validation = await api.getValidationFromGradeType(type);
      setGradeValidation(validation);
    };
    getValidation();
  }, [type]);

  useEffect(() => {
    const { minValue, maxValue } = gradeValidation;

    if (gradeValue < minValue || gradeValue > maxValue) {
      setErrorMessage(
        `O valor da nota deve ser entre ${minValue} e ${maxValue}.`
      );
      return;
    }
    setErrorMessage('');
  }, [gradeValue, gradeValidation]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.addEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose(null);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = {
      id,
      newValue: gradeValue,
    };
    onSave(formData);
  };

  const handleGradeChange = (event) => {
    setGradeValue(+event.target.value);
  };

  const handleModalClose = () => {
    onClose(null);
  };

  return (
    <div>
      <Modal isOpen={true}>
        <div style={flexStyle}>
          <span style={titleStyle}>Manutenção de notas</span>
          <button
            className="waves-effect waves-light btn red dark-4"
            onClick={handleModalClose}
          >
            x
          </button>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="input-field">
            <input type="text" id="inputName" value={student} readOnly />
            <label className="active" htmlFor="inputName">
              Nome do aluno:
            </label>
          </div>

          <div className="input-field">
            <input type="text" id="inputSubject" value={subject} readOnly />
            <label className="active" htmlFor="inputSubject">
              Disciplina:
            </label>
          </div>

          <div className="input-field">
            <input type="text" id="inputType" value={type} readOnly />
            <label className="active" htmlFor="inputType">
              Tipo de avaliação:
            </label>
          </div>

          <div className="input-field">
            <input
              id="inputGrade"
              type="number"
              min={gradeValidation.minValue}
              max={gradeValidation.maxValue}
              step="1"
              autoFocus
              value={gradeValue}
              onChange={handleGradeChange}
            />
            <label className="active" htmlFor="inputGrade">
              Nota:
            </label>
          </div>
          <div style={{ ...flexStyle }}>
            <button
              className="waves-effect waves-light btn"
              disabled={errorMessage.trim() !== ''}
            >
              Salvar
            </button>
            <span style={errorMessageStyle}>{errorMessage}</span>
          </div>
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
    justifyContent: 'space-between',
    marginBottom: '40px',
  },
  titleStyle: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
  },
  flexStartStyle: {
    justifyContent: 'flex-start',
  },
  errorMessageStyle: {
    color: '#FF0000',
    fontWeight: 'bold',
  },
};
