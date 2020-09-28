import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InquestPage } from './inquest.page';

describe('InquestPage', () => {
  let component: InquestPage;
  let fixture: ComponentFixture<InquestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InquestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InquestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
