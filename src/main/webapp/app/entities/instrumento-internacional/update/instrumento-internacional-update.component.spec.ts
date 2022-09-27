import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { InstrumentoInternacionalService } from '../service/instrumento-internacional.service';
import { IInstrumentoInternacional, InstrumentoInternacional } from '../instrumento-internacional.model';

import { InstrumentoInternacionalUpdateComponent } from './instrumento-internacional-update.component';

describe('InstrumentoInternacional Management Update Component', () => {
  let comp: InstrumentoInternacionalUpdateComponent;
  let fixture: ComponentFixture<InstrumentoInternacionalUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let instrumentoInternacionalService: InstrumentoInternacionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [InstrumentoInternacionalUpdateComponent],
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
      .overrideTemplate(InstrumentoInternacionalUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(InstrumentoInternacionalUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    instrumentoInternacionalService = TestBed.inject(InstrumentoInternacionalService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const instrumentoInternacional: IInstrumentoInternacional = { id: 456 };

      activatedRoute.data = of({ instrumentoInternacional });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(instrumentoInternacional));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<InstrumentoInternacional>>();
      const instrumentoInternacional = { id: 123 };
      jest.spyOn(instrumentoInternacionalService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ instrumentoInternacional });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: instrumentoInternacional }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(instrumentoInternacionalService.update).toHaveBeenCalledWith(instrumentoInternacional);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<InstrumentoInternacional>>();
      const instrumentoInternacional = new InstrumentoInternacional();
      jest.spyOn(instrumentoInternacionalService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ instrumentoInternacional });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: instrumentoInternacional }));
      saveSubject.complete();

      // THEN
      expect(instrumentoInternacionalService.create).toHaveBeenCalledWith(instrumentoInternacional);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<InstrumentoInternacional>>();
      const instrumentoInternacional = { id: 123 };
      jest.spyOn(instrumentoInternacionalService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ instrumentoInternacional });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(instrumentoInternacionalService.update).toHaveBeenCalledWith(instrumentoInternacional);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
