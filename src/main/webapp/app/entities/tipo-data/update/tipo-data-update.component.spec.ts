import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TipoDataService } from '../service/tipo-data.service';
import { ITipoData, TipoData } from '../tipo-data.model';

import { TipoDataUpdateComponent } from './tipo-data-update.component';

describe('TipoData Management Update Component', () => {
  let comp: TipoDataUpdateComponent;
  let fixture: ComponentFixture<TipoDataUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let tipoDataService: TipoDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TipoDataUpdateComponent],
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
      .overrideTemplate(TipoDataUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TipoDataUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tipoDataService = TestBed.inject(TipoDataService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const tipoData: ITipoData = { id: 456 };

      activatedRoute.data = of({ tipoData });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(tipoData));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<TipoData>>();
      const tipoData = { id: 123 };
      jest.spyOn(tipoDataService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoData });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tipoData }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(tipoDataService.update).toHaveBeenCalledWith(tipoData);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<TipoData>>();
      const tipoData = new TipoData();
      jest.spyOn(tipoDataService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoData });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tipoData }));
      saveSubject.complete();

      // THEN
      expect(tipoDataService.create).toHaveBeenCalledWith(tipoData);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<TipoData>>();
      const tipoData = { id: 123 };
      jest.spyOn(tipoDataService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoData });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(tipoDataService.update).toHaveBeenCalledWith(tipoData);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
