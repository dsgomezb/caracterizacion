import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AttachmentPage } from './attachment.page';

describe('AttachmentPage', () => {
  let component: AttachmentPage;
  let fixture: ComponentFixture<AttachmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachmentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AttachmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
