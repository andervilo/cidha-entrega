import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SecaoJudiciariaService } from '../service/secao-judiciaria.service';
import { ISecaoJudiciaria, SecaoJudiciaria } from '../secao-judiciaria.model';
import { ISubsecaoJudiciaria } from 'app/entities/subsecao-judiciaria/subsecao-judiciaria.model';
import { SubsecaoJudiciariaService } from 'app/entities/subsecao-judiciaria/service/subsecao-judiciaria.service';

import { SecaoJudiciariaUpdateComponent } from './secao-judiciaria-update.component';

describe('SecaoJudiciaria Management Update Component', () => {
  let comp: SecaoJudiciariaUpdateComponent;
  let fixture: ComponentFixture<SecaoJudiciariaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let secaoJudiciariaService: SecaoJudiciariaService;
  let subsecaoJudiciariaService: SubsecaoJudiciariaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SecaoJudiciariaUpdateComponent],
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
      .overrideTemplate(SecaoJudiciariaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SecaoJudiciariaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    secaoJudiciariaService = TestBed.inject(SecaoJudiciariaService);
    subsecaoJudiciariaService = TestBed.inject(SubsecaoJudiciariaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call SubsecaoJudiciaria query and add missing value', () => {
      const secaoJudiciaria: ISecaoJudiciaria = { id: 456 };
      const subsecaoJudiciaria: ISubsecaoJudiciaria = { id: 89415 };
      secaoJudiciaria.subsecaoJudiciaria = subsecaoJudiciaria;

      const subsecaoJudiciariaCollection: ISubsecaoJudiciaria[] = [{ id: 50461 }];
      jest.spyOn(subsecaoJudiciariaService, 'query').mockReturnValue(of(new HttpResponse({ body: subsecaoJudiciariaCollection })));
      const additionalSubsecaoJudiciarias = [subsecaoJudiciaria];
      const expectedCollection: ISubsecaoJudiciaria[] = [...additionalSubsecaoJudiciarias, ...subsecaoJudiciariaCollection];
      jest.spyOn(subsecaoJudiciariaService, 'addSubsecaoJudiciariaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ secaoJudiciaria });
      comp.ngOnInit();

      expect(subsecaoJudiciariaService.query).toHaveBeenCalled();
      expect(subsecaoJudiciariaService.addSubsecaoJudiciariaToCollectionIfMissing).toHaveBeenCalledWith(
        subsecaoJudiciariaCollection,
        ...additionalSubsecaoJudiciarias
      );
      expect(comp.subsecaoJudiciariasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const secaoJudiciaria: ISecaoJudiciaria = { id: 456 };
      const subsecaoJudiciaria: ISubsecaoJudiciaria = { id: 77313 };
      secaoJudiciaria.subsecaoJudiciaria = subsecaoJudiciaria;

      activatedRoute.data = of({ secaoJudiciaria });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(secaoJudiciaria));
      expect(comp.subsecaoJudiciariasSharedCollection).toContain(subsecaoJudiciaria);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<SecaoJudiciaria>>();
      const secaoJudiciaria = { id: 123 };
      jest.spyOn(secaoJudiciariaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ secaoJudiciaria });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: secaoJudiciaria }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(secaoJudiciariaService.update).toHaveBeenCalledWith(secaoJudiciaria);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<SecaoJudiciaria>>();
      const secaoJudiciaria = new SecaoJudiciaria();
      jest.spyOn(secaoJudiciariaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ secaoJudiciaria });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: secaoJudiciaria }));
      saveSubject.complete();

      // THEN
      expect(secaoJudiciariaService.create).toHaveBeenCalledWith(secaoJudiciaria);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<SecaoJudiciaria>>();
      const secaoJudiciaria = { id: 123 };
      jest.spyOn(secaoJudiciariaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ secaoJudiciaria });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(secaoJudiciariaService.update).toHaveBeenCalledWith(secaoJudiciaria);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackSubsecaoJudiciariaById', () => {
      it('Should return tracked SubsecaoJudiciaria primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackSubsecaoJudiciariaById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
