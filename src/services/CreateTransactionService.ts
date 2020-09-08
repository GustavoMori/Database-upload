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
    const transactionsRepository = getCustomRepository(TransactionsRepository)

    const categoryRepository = getRepository(Category)

    const { total } = await transactionsRepository.getBalance();
    if(type === 'outcome' && total < value ){
      throw new AppError('Balance insufficient.')
    }

    let checkCategoryTransactionExist = await categoryRepository.findOne({
      where: { title: category },
    });

    if (!checkCategoryTransactionExist){
      checkCategoryTransactionExist = categoryRepository.create({
        title: category
      })
      await categoryRepository.save(checkCategoryTransactionExist)
    }

    const transaction = transactionsRepository.create({
      title,
      value,
      type,
      category: checkCategoryTransactionExist,
    })

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
