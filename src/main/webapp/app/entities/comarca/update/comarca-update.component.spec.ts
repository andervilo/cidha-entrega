import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ComarcaService } from '../service/comarca.service';
import { IComarca, Comarca } from '../comarca.model';

import { ComarcaUpdateComponent } from './comarca-update.component';

describe('Comarca Management Update Component', () => {
  let comp: ComarcaUpdateComponent;
  let fixture: ComponentFixture<ComarcaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let comarcaService: ComarcaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ComarcaUpdateComponent],
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
      .overrideTemplate(ComarcaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ComarcaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    comarcaService = TestBed.inject(ComarcaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const comarca: IComarca = { id: 456 };

      activatedRoute.data = of({ comarca });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(comarca));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Comarca>>();
      const comarca = { id: 123 };
      jest.spyOn(comarcaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ comarca });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: comarca }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(comarcaService.update).toHaveBeenCalledWith(comarca);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Comarca>>();
      const comarca = new Comarca();
      jest.spyOn(comarcaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ comarca });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: comarca }));
      saveSubject.complete();

      // THEN
      expect(comarcaService.create).toHaveBeenCalledWith(comarca);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Comarca>>();
      const comarca = { id: 123 };
      jest.spyOn(comarcaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ comarca });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(comarcaService.update).toHaveBeenCalledWith(comarca);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
