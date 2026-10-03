from loans.models import Loan, Transaction, RepaymentSchedule


class DisbursementReport(Loan):
    class Meta:
        proxy = True
        managed = False
        verbose_name = 'Disbursement Report'
        verbose_name_plural = 'Disbursement Reports'


class CollectionsReport(Transaction):
    class Meta:
        proxy = True
        managed = False
        verbose_name = 'Collections Report'
        verbose_name_plural = 'Collections Reports'


class DelinquencyReport(RepaymentSchedule):
    class Meta:
        proxy = True
        managed = False
        verbose_name = 'Delinquency Report'
        verbose_name_plural = 'Delinquency Reports'
