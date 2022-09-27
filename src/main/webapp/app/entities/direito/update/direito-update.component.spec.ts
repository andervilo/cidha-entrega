import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DireitoService } from '../service/direito.service';
import { IDireito, Direito } from '../direito.model';

import { DireitoUpdateComponent } from './direito-update.component';

describe('Direito Management Update Component', () => {
  let comp: DireitoUpdateComponent;
  let fixture: ComponentFixture<DireitoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let direitoService: DireitoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DireitoUpdateComponent],
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
      .overrideTemplate(DireitoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DireitoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    direitoService = TestBed.inject(DireitoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const direito: IDireito = { id: 456 };

      activatedRoute.data = of({ direito });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(direito));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Direito>>();
      const direito = { id: 123 };
      jest.spyOn(direitoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ direito });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: direito }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(direitoService.update).toHaveBeenCalledWith(direito);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Direito>>();
      const direito = new Direito();
      jest.spyOn(direitoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ direito });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: direito }));
      saveSubject.complete();

      // THEN
      expect(direitoService.create).toHaveBeenCalledWith(direito);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Direito>>();
      const direito = { id: 123 };
      jest.spyOn(direitoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ direito });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(direitoService.update).toHaveBeenCalledWith(direito);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
