import { Expense } from '@/types';
import React, { useState } from 'react'
import CenterModal from './shared/CenterModal';
import ExpenseForm from './ExpenseForm';

const ExpensesFormModal = ({ expense, btn}: { expense?: Expense; btn:React.ReactNode})=> {
    const [open, setOpen] = useState(false)
  return (
    <CenterModal
        open={open}
        setOpen={setOpen}
        triggerBtn={btn}
        className='bg-white'
    >
        <ExpenseForm expense={expense} closeModal={setOpen} />
    </CenterModal>
  )
}

export default ExpensesFormModal