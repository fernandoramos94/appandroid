import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  // { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'detalle-restaurante', loadChildren: './pages/detalle-restaurante/detalle-restaurante.module#DetalleRestaurantePageModule' },
  { path: 'detalle-producto', loadChildren: './pages/detalle-producto/detalle-producto.module#DetalleProductoPageModule' },
  { path: 'mis-pedidos', loadChildren: './pages/mis-pedidos/mis-pedidos.module#MisPedidosPageModule' },
  { path: 'mis-direcciones', loadChildren: './pages/mis-direcciones/mis-direcciones.module#MisDireccionesPageModule' },
  { path: 'perfil', loadChildren: './pages/perfil/perfil.module#PerfilPageModule' },
  { path: 'checkout', loadChildren: './pages/checkout/checkout.module#CheckoutPageModule' },
  { path: 'estado-pedido', loadChildren: './pages/estado-pedido/estado-pedido.module#EstadoPedidoPageModule' },
  { path: 'busqueda', loadChildren: './pages/busqueda/busqueda.module#BusquedaPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'borrar-productos', loadChildren: './pages/borrar-productos/borrar-productos.module#BorrarProductosPageModule' },
  { path: 'detalles-pedido', loadChildren: './pages/detalles-pedido/detalles-pedido.module#DetallesPedidoPageModule' },
  { path: 'cambiar-contrasena', loadChildren: './pages/cambiar-contrasena/cambiar-contrasena.module#CambiarContrasenaPageModule' },
  { path: 'direccion-gps', loadChildren: './pages/direccion-gps/direccion-gps.module#DireccionGpsPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
