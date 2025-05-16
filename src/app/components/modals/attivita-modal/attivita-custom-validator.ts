import { AbstractControl, ValidationErrors } from '@angular/forms';

export function dateRangeValidator(group: AbstractControl): ValidationErrors | null {
  // Otteniamo i valori dei campi
  const start = group.get('data_inizio')?.value;
  const end = group.get('data_fine')?.value;

  // Se entrambe le date sono definite e end è minore di start, ritorna un errore
  if (start && end && end < start) {
    return { dateRange: true };
  }
  return null;
}
