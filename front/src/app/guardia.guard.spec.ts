import { TestBed, async, inject } from '@angular/core/testing';

import { GuardiaGuard } from './guardia.guard';

describe('GuardiaGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuardiaGuard]
    });
  });

  it('should ...', inject([GuardiaGuard], (guard: GuardiaGuard) => {
    expect(guard).toBeTruthy();
  }));
});
