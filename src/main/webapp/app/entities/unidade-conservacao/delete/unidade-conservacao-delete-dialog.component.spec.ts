jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { UnidadeConservacaoService } from '../service/unidade-conservacao.service';

import { UnidadeConservacaoDeleteDialogComponent } from './unidade-conservacao-delete-dialog.component';

describe('UnidadeConservacao Management Delete Component', () => {
  let comp: UnidadeConservacaoDeleteDialogComponent;
  let fixture: ComponentFixture<UnidadeConservacaoDeleteDialogComponent>;
  let service: UnidadeConservacaoService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [UnidadeConservacaoDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(UnidadeConservacaoDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(UnidadeConservacaoDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(UnidadeConservacaoService);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));

        // WHEN
        comp.confirmDelete(123);
        tick();

        // THEN
        expect(service.delete).toHaveBeenCalledWith(123);
        expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
      })
    ));

    it('Should not call delete service on clear', () => {
      // GIVEN
      jest.spyOn(service, 'delete');

      // WHEN
      comp.cancel();

      // THEN
      expect(service.delete).not.toHaveBeenCalled();
      expect(mockActiveModal.close).not.toHaveBeenCalled();
      expect(mockActiveModal.dismiss).toHaveBeenCalled();
    });
  });
});
