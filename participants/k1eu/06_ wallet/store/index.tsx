export type TCard = {
  id: string
  number: string
  image: string
  owner: string
  transactions: TTransaction[]
}

export type TTransaction = {
  id: string
  date: string
  amount: string
  vendor: string
}


const store: TCard[] = [
  {
    id: '1',
    number: '1234567890123456',
    image: 'https://picsum.photos/id/1/300/200',
    owner: 'John Doe',
    transactions: [
      {
        id: '1',
        date: '01/01/2020',
        amount: '$100.00',
        vendor: 'Starbucks',
      },
      {
        id: '2',
        date: '01/01/2020',
        amount: '$100.00',
        vendor: 'Starbucks',
      },
    ]
  },
  {
    id: '2',
    number: '1234567821373456',
    image: 'https://picsum.photos/id/2/300/200',
    owner: 'John Doe',
    transactions: [
      {
        id: '1',
        date: '01/01/2020',
        amount: '$100.00',
        vendor: 'Starbucks',
      },
      {
        id: '2',
        date: '01/01/2020',
        amount: '$100.00',
        vendor: 'Starbucks',
      },
      {
        id: '3',
        date: '01/01/2020',
        amount: '$100.00',
        vendor: 'Starbucks',
      },
      {
        id: '4',
        date: '01/01/2020',
        amount: '$100.00',
        vendor: 'Starbucks',
      },
      {
        id: '5',
        date: '01/01/2020',
        amount: '$100.00',
        vendor: 'Starbucks',
      },
      {
        id: '6',
        date: '01/01/2020',
        amount: '$100.00',
        vendor: 'Starbucks',
      },
      {
        id: '7',
        date: '01/01/2020',
        amount: '$100.00',
        vendor: 'Starbucks',
      },
      {
        id: '8',
        date: '01/01/2020',
        amount: '$100.00',
        vendor: 'Starbucks',
      },
    ]
  },
  {
    id: '3',
    number: '1234567821373456',
    image: 'https://picsum.photos/id/3/300/200',
    owner: 'John Doe',
    transactions: [
      {
        id: '1',
        date: '01/01/2020',
        amount: '$100.00',
        vendor: 'Starbucks',
      },
      {
        id: '2',
        date: '01/01/2020',
        amount: '$100.00',
        vendor: 'Starbucks',
      },
    ]
  },
  {
    id: '4',
    number: '1234567821373456',
    image: 'https://picsum.photos/id/4/300/200',
    owner: 'John Doe',
    transactions: [
      {
        id: '1',
        date: '01/01/2020',
        amount: '$100.00',
        vendor: 'Starbucks',
      },
      {
        id: '2',
        date: '01/01/2020',
        amount: '$100.00',
        vendor: 'Starbucks',
      },
    ]
  }
]

export default store
