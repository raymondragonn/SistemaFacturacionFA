import { FacturacionService } from '@/app/core/service/facturacion.service'
import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { RouterLink } from '@angular/router'
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-maintenance',
  imports: [RouterLink,NgbNavModule, FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './maintenance.component.html',
  styles: ``,
})
export class MaintenanceComponent {
  active = 1
  activeId = 1
  selectedTipoFacturacion: string = 'boletos';
  formAltaFactura: FormGroup;

  xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?><cfdi:Comprobante xsi:schemaLocation=\"http://www.sat.gob.mx/cfd/4 http://www.sat.gob.mx/sitio_internet/cfd/4/cfdv40.xsd\" Version=\"4.0\" Serie=\"Serie\" Folio=\"2080427802\" Fecha=\"2022-09-05T21:31:50\" Sello=\"\" FormaPago=\"99\" NoCertificado=\"\" Certificado=\"\" CondicionesDePago=\"CondicionesDePago\" SubTotal=\"200\" Moneda=\"MXN\" TipoCambio=\"1\" Total=\"180\" TipoDeComprobante=\"I\" Exportacion=\"01\" MetodoPago=\"PUE\" LugarExpedicion=\"20000\" xmlns:cfdi=\"http://www.sat.gob.mx/cfd/4\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">  <cfdi:InformacionGlobal Periodicidad=\"01\" Meses=\"01\" Año=\"2021\" />  <cfdi:Emisor Rfc=\"EKU9003173C9\" Nombre=\"ESCUELA KEMPER URGATE\" RegimenFiscal=\"601\" />  <cfdi:Receptor Rfc=\"XAXX010101000\" Nombre=\"PUBLICO EN GENERAL\" DomicilioFiscalReceptor=\"20000\" RegimenFiscalReceptor=\"616\" UsoCFDI=\"S01\" />  <cfdi:Conceptos>    <cfdi:Concepto ClaveProdServ=\"50211503\" NoIdentificacion=\"UT421511\" Cantidad=\"1\" ClaveUnidad=\"H87\" Unidad=\"Pieza\" Descripcion=\"Cigarros\" ValorUnitario=\"200.00\" Importe=\"200.00\" ObjetoImp=\"02\">      <cfdi:Impuestos>        <cfdi:Retenciones>          <cfdi:Retencion Base=\"200\" Impuesto=\"001\" TipoFactor=\"Tasa\" TasaOCuota=\"0.100000\" Importe=\"20\" />        </cfdi:Retenciones>      </cfdi:Impuestos>    </cfdi:Concepto>  </cfdi:Conceptos>  <cfdi:Impuestos TotalImpuestosRetenidos=\"20\"    <cfdi:Retenciones>      <cfdi:Retencion Impuesto=\"001\" Importe=\"20\" />    </cfdi:Retenciones>  </cfdi:Impuestos></cfdi:Comprobante>"

  constructor(private serviceFactura: FacturacionService) {
    this.formAltaFactura = new FormGroup({
      selectedTipoFacturacion: new FormControl('', Validators.required),
      rfc: new FormControl('', [Validators.required, Validators.pattern('[A-Z0-9]{12,13}')]),
      tokenBoleto: new FormControl(''),
      tokenGuia: new FormControl(''),
      ticketCompra: new FormControl(''),
      fechaCompra: new FormControl(''),
      UsoCFDI: new FormControl('', Validators.required),
      domicilioFiscal: new FormControl('', Validators.required),
      correoElectronico: new FormControl('', [Validators.required, Validators.email]),
      formaPago: new FormControl('', Validators.required),
      metodoPago: new FormControl('', Validators.required),
    });
  }




  onChange(event: any){
    console.log(console.log(event))
  }

  buildXML(): string {
    const formValues = this.formAltaFactura.value;

    const xml = `
      <?xml version="1.0" encoding="utf-8"?>
      <cfdi:Comprobante xsi:schemaLocation="http://www.sat.gob.mx/cfd/3 http://www.sat.gob.mx/sitio_Internet/cfd/3/cfdv33.xsd" 
        Version="3.3" Serie="RogueOne" Folio="HFK231" 
        Fecha="${new Date().toISOString()}" Sello="" FormaPago="${formValues.formaPago}" 
        NoCertificado="" Certificado="" SubTotal="200.00" Moneda="MXN" TipoCambio="1" 
        Total="603.20" TipoDeComprobante="I" MetodoPago="${formValues.metodoPago}" 
        LugarExpedicion="06380" 
        xmlns:cfdi="http://www.sat.gob.mx/cfd/3" 
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
        
        <cfdi:Emisor RFC="${formValues.rfc}" Nombre="NUBE DIGITALES SC" RegimenFiscal="601" /> 
        <cfdi:Receptor Rfc="AAA010101AAA" Nombre="SM SOFTWARE" UsoCFDI="${formValues.UsoCFDI}" /> 
        
        <cfdi:Conceptos> 
          <cfdi:Concepto ClaveProdServ="50211503" ClaveUnidad="UT421511" Cantidad="1" Unidad="Pieza" 
            Descripcion="Cigarros" ValorUnitario="200.00" Importe="200.00"> 
            <cfdi:Impuestos> 
              <cfdi:Traslados> 
                <cfdi:Traslado Base="200.00" Impuesto="002" TipoFactor="Tasa" TasaOCuota="0.160000" Importe="32.00" /> 
                <cfdi:Traslado Base="232.00" Impuesto="003" TipoFactor="Tasa" TasaOCuota="1.600000" Importe="371.20" /> 
              </cfdi:Traslados> 
            </cfdi:Impuestos> 
          </cfdi:Concepto> 
        </cfdi:Conceptos> 
        
        <cfdi:Impuestos TotalImpuestosTrasladados="403.20"> 
          <cfdi:Traslados> 
            <cfdi:Traslado Impuesto="002" TipoFactor="Tasa" TasaOCuota="0.160000" Importe="32.00" /> 
            <cfdi:Traslado Impuesto="003" TipoFactor="Tasa" TasaOCuota="1.600000" Importe="371.20" /> 
          </cfdi:Traslados> 
        </cfdi:Impuestos> 
      </cfdi:Comprobante>
    `;

    return xml.trim(); // Elimina espacios innecesarios
  }



  onSubmit() {

    this.serviceFactura.authenticate().subscribe(( response: any)  =>{
      const token = response.token;
      console.log('Respuesta Auth: ', response);
      this.serviceFactura.generarFactura(this.xml, token).subscribe((respond: any) => {
        console.log('Respuesta factura: ', respond);
      }, (error) => {
        console.log('Error:', error);
      })
    }, (error) => {
      console.log('Error: ', error);
    });
    // if (this.formAltaFactura.valid) {
    //   const xml = this.buildXML();

    //   console.log('Formulario válido:', this.formAltaFactura.value);
      



    // } else {
    //   console.log('Formulario inválido');
    //   this.formAltaFactura.markAllAsTouched(); // Marca todos los campos como tocados para mostrar errores
    // }
  }
}
  