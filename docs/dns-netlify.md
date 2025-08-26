# DNS en Netlify + Correo en Hostinger (Guía Operativa)

Este documento describe cómo publicar **metalurgicabreques.com.ar** con **web en Netlify** y **correo en Hostinger/Titan**, manteniendo el email intacto.

---

## 0) Prerrequisitos
- Acceso a **Netlify** (sitio ya desplegado).
- Acceso del **titular** a **NIC/TAD** (para cambiar nameservers cuando toque).
- (Opcional) Cuenta **Hostinger** de la empresa para tener el **servicio de email** a nombre de la familia (no es hosting web; es el servicio de correo).

---

## 1) Preflight (copiar registros actuales)
Ejecutar y **guardar** resultados (capturas o archivo de texto):

```bash
nslookup -type=mx metalurgicabreques.com.ar
nslookup -type=txt metalurgicabreques.com.ar
nslookup -type=txt _dmarc.metalurgicabreques.com.ar


