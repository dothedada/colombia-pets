# POST-Prueba técnica

Listo, en la noche que tuve un tiempo, le di una mano a los puntos faltantes... acá les comparto una corta descripción de lo que hice...

## Animación del mapa al cambiar de departamento

Este fue el más fácil, pues ya solo faltaba crear un nuevo componente interno que hiciera un llamado al hook de useMap para que aplicara el cambio de coordenadas dentro de un useEffect en el que se usa el método flyTo... Vi que había opciones de jugar un poco con las animaciones de esa transición, pero no quería abrir ese melón a esa hora.

## Gráfica de mascotas por departamento

En esta, luego de hacer el llamado al endpoint de pets-group-by-year, dentro del componente StatisticsGraph limpié y organicé la información que luego pasé dentro del componente ResponsiveBar de la librería de Nivo. La gráfica decidí moverla abajo del mapa para balancear un poco la cantidad de información y como un ejercicio para visualizar el problema que encontré y describo en el siguiente punto.

## Sobre el olor que me provocaban tantos useEffect

Ya con el ejercicio funcional, había algo que seguía sin encajarme y que creo era una de las razones del olor que me producía tanto useEffect. Algo como síntoma de un error de arquitectura... Sospechaba que al tener todo en un solo megacomponente, al cambiar el estado del año (que solo es necesario para una parte de la app) se genera un re-render de toda la aplicación, cosa que comprobé con las React Developer Tools... La obtención de los datos puede llegar a ser costosa, y mas si se espera que la data recolectada crezca, así que para solucionarlo, antes de llenar todo con useMemo y hacer malabares, plantearía un pequeño cambio de arquitectura... dividir el componente en al menos dos partes: las que dependen del estado de año y departamento, y las que solo dependen de departamento. Levantar el estado de departamento a un componente que pase la info sea por contexto o por prop a los dos tipos de elementos, y que el año sea manejado internamente dentro del componente que contiene los componentes que se relacionan con el año.

## y ya

Ya con más calma, los ajustes faltantes tomaron unos 30 minutos, donde casi la mitad fue buscando dónde era que se ponían las mascotas para el gráfico... Aunque me hubiera gustado poder hacerlo más rápido, estuvo bastante divertido y aprendí un montón en el proceso. Muchísimas gracias por la oportunidad.
