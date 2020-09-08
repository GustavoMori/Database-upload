import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import { getCustomRepository, getRepository } from 'typeorm'; // tratamento de dados 'interface de conexao com o banco de dados'
import { check } from 'prettier';
import TransactionsRepository from '../repositories/TransactionsRepository'
import Category from '../models/Category'


interface Request {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}


class CreateTransactionService {
  public async execute({ title, value, type, category}:Request ): Promise<Transaction> {
    const transactionRepository = getCustomRepository(TransactionsRepository)

    // const checkTransactionExist = await transactionRepository.findOne({
    //   where: { category }
    // });
    // if (!checkTransactionExist) {
    //   throw new AppError('Category is invalid.')
    // }

    const transaction = transactionRepository.create({
      title,
      value,
      type,
    })

    await transactionRepository.save(transaction)
    return transaction;
  }
}

export default CreateTransactionService;
