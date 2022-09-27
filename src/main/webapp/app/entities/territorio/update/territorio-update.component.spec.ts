import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TerritorioService } from '../service/territorio.service';
import { ITerritorio, Territorio } from '../territorio.model';

import { TerritorioUpdateComponent } from './territorio-update.component';

describe('Territorio Management Update Component', () => {
  let comp: TerritorioUpdateComponent;
  let fixture: ComponentFixture<TerritorioUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let territorioService: TerritorioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TerritorioUpdateComponent],
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
      .overrideTemplate(TerritorioUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TerritorioUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    territorioService = TestBed.inject(TerritorioService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const territorio: ITerritorio = { id: 456 };

      activatedRoute.data = of({ territorio });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(territorio));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Territorio>>();
      const territorio = { id: 123 };
      jest.spyOn(territorioService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ territorio });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: territorio }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(territorioService.update).toHaveBeenCalledWith(territorio);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Territorio>>();
      const territorio = new Territorio();
      jest.spyOn(territorioService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ territorio });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: territorio }));
      saveSubject.complete();

      // THEN
      expect(territorioService.create).toHaveBeenCalledWith(territorio);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Territorio>>();
      const territorio = { id: 123 };
      jest.spyOn(territorioService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ territorio });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(territorioService.update).toHaveBeenCalledWith(territorio);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
