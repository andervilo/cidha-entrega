import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FundamentacaoDoutrinariaService } from '../service/fundamentacao-doutrinaria.service';
import { IFundamentacaoDoutrinaria, FundamentacaoDoutrinaria } from '../fundamentacao-doutrinaria.model';

import { FundamentacaoDoutrinariaUpdateComponent } from './fundamentacao-doutrinaria-update.component';

describe('FundamentacaoDoutrinaria Management Update Component', () => {
  let comp: FundamentacaoDoutrinariaUpdateComponent;
  let fixture: ComponentFixture<FundamentacaoDoutrinariaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let fundamentacaoDoutrinariaService: FundamentacaoDoutrinariaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FundamentacaoDoutrinariaUpdateComponent],
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
      .overrideTemplate(FundamentacaoDoutrinariaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FundamentacaoDoutrinariaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fundamentacaoDoutrinariaService = TestBed.inject(FundamentacaoDoutrinariaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const fundamentacaoDoutrinaria: IFundamentacaoDoutrinaria = { id: 456 };

      activatedRoute.data = of({ fundamentacaoDoutrinaria });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(fundamentacaoDoutrinaria));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<FundamentacaoDoutrinaria>>();
      const fundamentacaoDoutrinaria = { id: 123 };
      jest.spyOn(fundamentacaoDoutrinariaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fundamentacaoDoutrinaria });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fundamentacaoDoutrinaria }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(fundamentacaoDoutrinariaService.update).toHaveBeenCalledWith(fundamentacaoDoutrinaria);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<FundamentacaoDoutrinaria>>();
      const fundamentacaoDoutrinaria = new FundamentacaoDoutrinaria();
      jest.spyOn(fundamentacaoDoutrinariaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fundamentacaoDoutrinaria });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fundamentacaoDoutrinaria }));
      saveSubject.complete();

      // THEN
      expect(fundamentacaoDoutrinariaService.create).toHaveBeenCalledWith(fundamentacaoDoutrinaria);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<FundamentacaoDoutrinaria>>();
      const fundamentacaoDoutrinaria = { id: 123 };
      jest.spyOn(fundamentacaoDoutrinariaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fundamentacaoDoutrinaria });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(fundamentacaoDoutrinariaService.update).toHaveBeenCalledWith(fundamentacaoDoutrinaria);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
