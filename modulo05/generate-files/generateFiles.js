const fs = require('fs').promises;

const willPush = [true, false];

const globalCategories = ['Lazer', 'Mercado', 'Receita', 'Saúde', 'Transporte'];
const currentYear = new Date().getFullYear();
const globalYears = [currentYear - 1, currentYear, currentYear + 1];
const globalMonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const globalAllDescriptions = [
  {
    category: 'Lazer',
    descriptions: [
      'Ida ao cinema',
      'Almoço em restaurante',
      'Viagem para a praia',
    ],
  },
  {
    category: 'Mercado',
    descriptions: [
      'Compras em supermercado',
      'Compras em hortifruti',
      'Compras em padaria',
    ],
  },
  {
    category: 'Receita',
    descriptions: [
      'Salário mensal',
      'Renda extra com vendas',
      'Consultoria de desenvolvimento de sistemas',
    ],
  },
  {
    category: 'Saúde',
    descriptions: [
      'Remédios na farmácia',
      'Internação em hospital',
      'Emergência com acidente caseiro',
    ],
  },
  {
    category: 'Transporte',
    descriptions: [
      'Transporte com ônibus',
      'Utilização de aplicativo de transporte',
      'Táxi para o aeroporto',
    ],
  },
];

const globalTransactions = [];

async function generateDB() {
  globalCategories.forEach((category) => {
    globalYears.forEach((year) => {
      globalMonths.forEach((month) => {
        // Dias do mês
        for (let i = 1; i <= 28; i++) {
          const dayString = i.toString().padStart(2, '0');
          const monthString = month.toString().padStart(2, '0');
          const description = getRandomDescriptionFrom(category);
          const type = category.toLowerCase().includes('receita') ? '+' : '-';

          if (willPushThisTransaction()) {
            globalTransactions.push({
              description,
              value: getRandomValue(10, 50),
              category,
              year,
              month,
              day: i,
              yearMonth: `${year}-${monthString}`,
              yearMonthDay: `${year}-${monthString}-${dayString}`,
              type,
            });
          }
        }
      });
    });
  });

  globalYears.forEach((year) => {
    globalMonths.forEach((month) => {
      const monthString = month.toString().padStart(2, '0');

      // Adicionando salário no primeiro dia do mês
      globalTransactions.push({
        description: 'Salário',
        value: 4000,
        category: globalCategories[2],
        year,
        month,
        day: 1,
        yearMonth: `${year}-${monthString}`,
        yearMonthDay: `${year}-${monthString}-01`,
        type: '+',
      });
    });
  });

  //Ordenação
  globalTransactions.sort((a, b) => {
    return a.yearMonthDay.localeCompare(b.yearMonthDay);
  });

  await fs.writeFile(
    `${globalFolder}transactionsArray.json`,
    JSON.stringify(globalTransactions, null, 2)
  );

  console.log('Done');
}

function getRandomDescriptionFrom(category) {
  const descriptionItem = globalAllDescriptions.find(
    (description) => description.category === category
  );

  const size = descriptionItem.descriptions.length;
  const random = Math.ceil(Math.random() * (size - 1));
  return descriptionItem.descriptions[random];
}

function getRandomValue(from = 0, to = 1000) {
  return Math.max(from, Math.ceil(Math.random() * to));
}

function willPushThisTransaction() {
  const index = Math.round(Math.random());
  return willPush[index];
}

const globalFolder = './test-db/';

generateDB().then(() => {
  console.log(
    `Arquivo "${globalFolder}transactionsArray.json" gerado com sucesso.`
  );
});
