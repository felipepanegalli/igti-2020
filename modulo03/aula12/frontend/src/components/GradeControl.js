import React from 'react';
import Action from './Action';

export default function GradeControl({ grades, onDelete, onPersist }) {
  const { goodGrade, badGrade, table } = styles;

  const tableGrades = [];
  let currentStudent = grades[0].student;
  let currentSubject = grades[0].subject;
  let currentGrades = [];
  let id = 1;

  grades.forEach((grade) => {
    if (grade.subject !== currentSubject) {
      tableGrades.push({
        id: id++,
        student: currentStudent,
        grades: currentGrades,
        subject: currentSubject,
      });

      currentSubject = grade.subject;
      currentGrades = [];
    }
    if (grade.student !== currentStudent) {
      currentStudent = grade.student;
    }
    currentGrades.push(grade);
  });

  tableGrades.push({
    id: id++,
    student: currentStudent,
    grades: currentGrades,
    subject: currentSubject,
  });

  const handleActionClick = (id, type) => {
    const grade = grades.find((grade) => grade.id === id);

    if (type === 'delete') {
      onDelete(grade);
      return;
    }

    onPersist(grade);
  };

  return (
    <div>
      {tableGrades.map(({ id, grades }) => {
        const finalGrade = grades.reduce((acc, curr) => acc + curr.value, 0);
        const gradeStyle = finalGrade >= 70 ? goodGrade : badGrade;
        return (
          <table className="striped" style={table} key={id}>
            <thead>
              <tr>
                <th style={{ width: '20%' }}>Aluno</th>
                <th style={{ width: '20%' }}>Disciplina</th>
                <th style={{ width: '20%' }}>Avaliação</th>
                <th style={{ width: '20%' }}>Nota</th>
                <th style={{ width: '20%' }} className="center">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {grades.map(
                ({ id, subject, student, type, value, isDeleted }) => {
                  return (
                    <tr key={id}>
                      <td>{student}</td>
                      <td>{subject}</td>
                      <td>{type}</td>
                      <td>{isDeleted ? ' - ' : value}</td>
                      <td className="center">
                        <div>
                          <Action
                            id={id}
                            onActionClick={handleActionClick}
                            type={isDeleted ? 'add' : 'edit'}
                          />
                          {!isDeleted && (
                            <Action
                              type="delete"
                              id={id}
                              onActionClick={handleActionClick}
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>

            <tfoot>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td className="right">Nota total:</td>
                <td className="center" style={gradeStyle}>
                  {finalGrade}
                </td>
              </tr>
            </tfoot>
          </table>
        );
      })}
    </div>
  );
}

const styles = {
  goodGrade: {
    fontWeight: 'bold',
    color: 'green',
  },
  badGrade: {
    fontWeight: 'bold',
    color: 'red',
  },
  table: {
    margin: '30px 0',
  },
};
