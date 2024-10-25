import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ApiResponseModel,
  Application,
  Loan,
} from '../../model/model.component';
import { MasterService } from '../../service/master/master.component';

@Component({
  selector: 'app-loan-application',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './loan-application.component.html',
  styleUrl: './loan-application.component.css',
})
export class LoanApplicationComponent {
  application: Application = new Application();
  loan: Loan = new Loan();

  masterSrv = inject(MasterService);
  addLoan() {
    const strObj = JSON.stringify(this.loan);
    const newObj = JSON.parse(strObj);
    this.application.Loans.unshift(newObj);
    this.loan = new Loan();
  }

  onSubmit() {
    debugger;
    this.masterSrv.addNewApplication(this.application).subscribe(
      (Result: ApiResponseModel) => {
        if (Result.result) {
          alert('Loan Application Success');
        } else {
          alert(Result.message);
        }
      },
      (error) => {
        alert(error);
      }
    );
  }
}
