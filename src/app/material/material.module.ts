import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MatInputModule } from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
// import {MatIconModule} from '@angular/material/icon';
import { MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSnackBarModule } from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatProgressBarModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSnackBarModule
    
    
  ],
  exports: [MatInputModule,MatProgressBarModule,MatIconModule],
  declarations: []
})
export class MaterialModule { }
