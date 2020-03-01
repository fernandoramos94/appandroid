import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  {
    path: 'home',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'detalle-restaurante/:id_store', loadChildren: './pages/detalle-restaurante/detalle-restaurante.module#DetalleRestaurantePageModule', pathMatch: "full" },
  { path: 'detalle-producto/:id_product', loadChildren: './pages/detalle-producto/detalle-producto.module#DetalleProductoPageModule' },
  { path: 'mis-pedidos', loadChildren: './pages/mis-pedidos/mis-pedidos.module#MisPedidosPageModule' },
  { path: 'mis-direcciones', loadChildren: './pages/mis-direcciones/mis-direcciones.module#MisDireccionesPageModule' },
  { path: 'perfil', loadChildren: './pages/perfil/perfil.module#PerfilPageModule' },
  { path: 'checkout', loadChildren: './pages/checkout/checkout.module#CheckoutPageModule' },
  { path: 'estado-pedido', loadChildren: './pages/estado-pedido/estado-pedido.module#EstadoPedidoPageModule' },
  { path: 'busqueda', loadChildren: './pages/busqueda/busqueda.module#BusquedaPageModule' },
  { path: 'detalles-pedido', loadChildren: './pages/detalles-pedido/detalles-pedido.module#DetallesPedidoPageModule' },
  { path: 'cambiar-contrasena', loadChildren: './pages/cambiar-contrasena/cambiar-contrasena.module#CambiarContrasenaPageModule' },
  { path: 'direccion-gps', loadChildren: './pages/direccion-gps/direccion-gps.module#DireccionGpsPageModule' },
  { path: 'inicio', loadChildren: './pages/inicio/inicio.module#InicioPageModule' },
  { path: 'address', loadChildren: './pages/address/address.module#AddressPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
