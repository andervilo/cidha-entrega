import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SubsecaoJudiciariaService } from '../service/subsecao-judiciaria.service';
import { ISubsecaoJudiciaria, SubsecaoJudiciaria } from '../subsecao-judiciaria.model';

import { SubsecaoJudiciariaUpdateComponent } from './subsecao-judiciaria-update.component';

describe('SubsecaoJudiciaria Management Update Component', () => {
  let comp: SubsecaoJudiciariaUpdateComponent;
  let fixture: ComponentFixture<SubsecaoJudiciariaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let subsecaoJudiciariaService: SubsecaoJudiciariaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SubsecaoJudiciariaUpdateComponent],
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
      .overrideTemplate(SubsecaoJudiciariaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SubsecaoJudiciariaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    subsecaoJudiciariaService = TestBed.inject(SubsecaoJudiciariaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const subsecaoJudiciaria: ISubsecaoJudiciaria = { id: 456 };

      activatedRoute.data = of({ subsecaoJudiciaria });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(subsecaoJudiciaria));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<SubsecaoJudiciaria>>();
      const subsecaoJudiciaria = { id: 123 };
      jest.spyOn(subsecaoJudiciariaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ subsecaoJudiciaria });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: subsecaoJudiciaria }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(subsecaoJudiciariaService.update).toHaveBeenCalledWith(subsecaoJudiciaria);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<SubsecaoJudiciaria>>();
      const subsecaoJudiciaria = new SubsecaoJudiciaria();
      jest.spyOn(subsecaoJudiciariaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ subsecaoJudiciaria });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: subsecaoJudiciaria }));
      saveSubject.complete();

      // THEN
      expect(subsecaoJudiciariaService.create).toHaveBeenCalledWith(subsecaoJudiciaria);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<SubsecaoJudiciaria>>();
      const subsecaoJudiciaria = { id: 123 };
      jest.spyOn(subsecaoJudiciariaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ subsecaoJudiciaria });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(subsecaoJudiciariaService.update).toHaveBeenCalledWith(subsecaoJudiciaria);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
