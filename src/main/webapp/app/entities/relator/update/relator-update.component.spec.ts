import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { RelatorService } from '../service/relator.service';
import { IRelator, Relator } from '../relator.model';

import { RelatorUpdateComponent } from './relator-update.component';

describe('Relator Management Update Component', () => {
  let comp: RelatorUpdateComponent;
  let fixture: ComponentFixture<RelatorUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let relatorService: RelatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [RelatorUpdateComponent],
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
      .overrideTemplate(RelatorUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RelatorUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    relatorService = TestBed.inject(RelatorService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const relator: IRelator = { id: 456 };

      activatedRoute.data = of({ relator });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(relator));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Relator>>();
      const relator = { id: 123 };
      jest.spyOn(relatorService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ relator });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: relator }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(relatorService.update).toHaveBeenCalledWith(relator);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Relator>>();
      const relator = new Relator();
      jest.spyOn(relatorService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ relator });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: relator }));
      saveSubject.complete();

      // THEN
      expect(relatorService.create).toHaveBeenCalledWith(relator);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Relator>>();
      const relator = { id: 123 };
      jest.spyOn(relatorService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ relator });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(relatorService.update).toHaveBeenCalledWith(relator);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
