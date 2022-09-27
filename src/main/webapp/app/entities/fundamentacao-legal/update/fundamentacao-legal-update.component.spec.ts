import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FundamentacaoLegalService } from '../service/fundamentacao-legal.service';
import { IFundamentacaoLegal, FundamentacaoLegal } from '../fundamentacao-legal.model';

import { FundamentacaoLegalUpdateComponent } from './fundamentacao-legal-update.component';

describe('FundamentacaoLegal Management Update Component', () => {
  let comp: FundamentacaoLegalUpdateComponent;
  let fixture: ComponentFixture<FundamentacaoLegalUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let fundamentacaoLegalService: FundamentacaoLegalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FundamentacaoLegalUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(FundamentacaoLegalUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FundamentacaoLegalUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fundamentacaoLegalService = TestBed.inject(FundamentacaoLegalService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const fundamentacaoLegal: IFundamentacaoLegal = { id: 456 };

      activatedRoute.data = of({ fundamentacaoLegal });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(fundamentacaoLegal));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<FundamentacaoLegal>>();
      const fundamentacaoLegal = { id: 123 };
      jest.spyOn(fundamentacaoLegalService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fundamentacaoLegal });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fundamentacaoLegal }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(fundamentacaoLegalService.update).toHaveBeenCalledWith(fundamentacaoLegal);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<FundamentacaoLegal>>();
      const fundamentacaoLegal = new FundamentacaoLegal();
      jest.spyOn(fundamentacaoLegalService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fundamentacaoLegal });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fundamentacaoLegal }));
      saveSubject.complete();

      // THEN
      expect(fundamentacaoLegalService.create).toHaveBeenCalledWith(fundamentacaoLegal);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<FundamentacaoLegal>>();
      const fundamentacaoLegal = { id: 123 };
      jest.spyOn(fundamentacaoLegalService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fundamentacaoLegal });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(fundamentacaoLegalService.update).toHaveBeenCalledWith(fundamentacaoLegal);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
