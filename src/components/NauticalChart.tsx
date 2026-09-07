import type { CSSProperties } from "react";

import { cn } from "@/lib/cn";

/**
 * Isobatas: las curvas de nivel del fondo del mar de una carta nautica.
 *
 * Es el unico guino nautico grafico del sitio y esta pensado para NO verse a la
 * primera: trazo de 1px real y opacidad del 5%. Quien mira ve textura; quien se
 * fija, ve una carta.
 *
 * Los nueve anillos se generaron con tres armonicos (sin 3t, 5t, 7t) sobre un
 * radio base, con la fase corrida un poco en cada anillo. Se comprobo que no se
 * cruzan: la separacion minima entre dos anillos consecutivos es de 47px en
 * unidades del viewBox.
 */
const ISOBATHS: readonly string[] = [
  "M913.4 300C915.4 309.4 906.3 321.8 898.3 330.8C890.4 339.7 878.7 349.9 865.7 353.8C852.6 357.7 834.8 354.8 820 354.2C805.2 353.7 791.4 354 777 350.6C762.6 347.2 740.2 342.4 733.6 333.9C727 325.5 735.3 310.5 737.4 300C739.4 289.5 739.2 279.2 745.9 270.9C752.6 262.6 765.3 256.2 777.7 250.1C790 244.1 805.4 235.1 820 234.6C834.6 234 854 240.4 865 247C876 253.6 878 265.2 886 274.1C894.1 282.9 911.3 290.6 913.4 300Z",
  "M979.6 300C981.8 316.1 963.7 336 949.8 351C936 366 918.1 384 896.5 390.1C874.8 396.1 845.8 387.1 820 387.5C794.2 387.9 764.9 397.7 741.7 392.3C718.4 386.8 690.1 370.2 680.4 354.8C670.7 339.4 681.5 317.4 683.6 300C685.8 282.6 682.7 264.4 693.5 250.3C704.3 236.3 727.4 226.4 748.5 215.7C769.6 205.1 796.5 185.8 820 186.2C843.5 186.6 870.2 206.6 889.7 218C909.1 229.3 921.8 240.5 936.7 254.2C951.7 267.8 977.5 283.9 979.6 300Z",
  "M1047 300C1048.3 324.3 1029.5 353.4 1009.5 374.4C989.4 395.4 958.4 417.2 926.9 425.9C895.3 434.6 857.9 423.9 820 426.6C782.1 429.3 730.8 450.9 699.3 442.1C667.9 433.4 644.7 397.8 631.3 374.1C617.9 350.4 617.8 324.2 619 300C620.3 275.8 623.2 249.9 638.8 228.9C654.4 207.8 682.7 189.4 712.9 173.8C743.1 158.3 786.6 132.9 820 135.6C853.4 138.3 883 174.6 913.3 190.1C943.7 205.6 979.7 210.2 1002 228.6C1024.3 246.9 1045.8 275.7 1047 300Z",
  "M1116.8 300C1116.7 334.1 1107 375.5 1080.1 402.1C1053.2 428.7 998.8 446.5 955.4 459.5C912.1 472.5 870.2 474.2 820 480.2C769.8 486.2 693.7 510 654 495.5C614.3 481.1 600.6 426.1 581.7 393.5C562.9 361 540.8 331.2 540.8 300C540.7 268.8 560.2 236.2 581.3 206.3C602.4 176.3 627.6 139.9 667.4 120.3C707.2 100.7 774.2 82.5 820 88.5C865.8 94.5 898.6 138.1 942 156.3C985.4 174.5 1051.4 173.8 1080.6 197.7C1109.7 221.7 1116.8 265.9 1116.8 300Z",
  "M1195.1 300C1193.8 344.5 1191.2 399.7 1156 431.9C1120.8 464.1 1039.9 473 983.9 493.1C927.9 513.1 882 543.5 820 552.2C758 560.9 661.2 567.9 611.8 545.3C562.3 522.6 549.3 457.4 523.2 416.5C497.1 375.6 456.5 339.4 455.1 300C453.8 260.6 488.7 220.8 515.1 180.3C541.6 139.9 563.1 79.1 613.9 57.3C664.7 35.4 758.7 40.3 820 49C881.3 57.7 924.4 90.2 981.8 109.5C1039.1 128.8 1128.5 133.2 1164.1 164.9C1199.6 196.7 1196.5 255.5 1195.1 300Z",
  "M1287.8 300C1284.7 354.2 1270 420.1 1225.1 459C1180.2 498 1086.1 504.3 1018.6 533.9C951.1 563.6 893.8 627.9 820 636.8C746.2 645.7 637.4 619.5 575.9 587.5C514.3 555.6 484.6 492.9 450.6 445C416.6 397.1 374.9 349.6 371.8 300C368.7 250.4 400.4 198.5 431.8 147.6C463.3 96.7 495.9 16.8 560.6 -5.5C625.3 -27.8 741.1 5 820 13.9C898.9 22.8 963.2 28.1 1033.9 48.1C1104.5 68 1201.6 91.6 1243.9 133.6C1286.2 175.6 1290.9 245.8 1287.8 300Z",
  "M1393.9 300C1387.2 363.1 1336.5 432.8 1282.1 481.4C1227.8 530.1 1144.9 551.9 1067.9 592C990.9 632.1 907.6 715.9 820 721.8C732.4 727.7 617.7 668 542 627.4C466.4 586.8 408 532.8 366 478.2C324 423.7 296.5 362 289.9 300C283.2 238 288.4 165.8 326.1 106.1C363.7 46.4 433.6 -35.6 515.9 -58.1C598.2 -80.6 723.6 -34.8 820 -28.9C916.4 -23 1010.4 -44.7 1094 -22.8C1177.7 -0.8 1272.1 49.1 1322.1 102.9C1372.1 156.7 1400.5 236.9 1393.9 300Z",
  "M1502.1 300C1489.7 372.5 1397.8 440.9 1336.7 502.8C1275.6 564.8 1221.6 622.5 1135.5 671.6C1049.4 720.7 925.6 797.2 820 797.7C714.4 798.2 592.2 722.2 501.8 674.7C411.5 627.3 329.2 575.3 277.9 512.8C226.6 450.4 206.4 375.8 194.1 300C181.7 224.2 156 124.6 203.9 58.1C251.8 -8.3 378.8 -73.7 481.5 -98.7C584.2 -123.7 707.6 -92.2 820 -91.7C932.4 -91.2 1057.4 -122.2 1155.8 -95.5C1254.3 -68.9 1353 2.2 1410.7 68.1C1468.4 134 1514.4 227.5 1502.1 300Z",
  "M1592.7 300C1574.5 383.9 1470.1 453.1 1407 530.4C1343.8 607.8 1311.7 708.7 1213.8 763.9C1116 819.1 946.9 866.9 820 861.7C693.1 856.5 556.5 785.6 452.5 732.8C348.5 680 260 617.1 196 545C132 472.8 86.8 388.8 68.7 300C50.5 211.2 23.3 84.6 87.2 12.3C151 -60 329.7 -102.5 451.8 -133.6C574 -164.8 692.9 -169.5 820 -174.6C947.1 -179.8 1098.6 -198.2 1214.5 -164.7C1330.5 -131.1 1452.8 -50.6 1515.8 26.8C1578.8 104.3 1610.8 216.1 1592.7 300Z",
];

interface VariantConfig {
  /** Rotacion sobre el centro del viewBox: reaprovecha el mismo relieve. */
  transform?: string;
  /** Difuminado radial. Sin el, las lineas cortan en seco contra el borde. */
  mask: string;
  opacity: number;
}

const VARIANTS: Record<"hero" | "contact", VariantConfig> = {
  // El relieve queda arriba a la derecha, fuera del bloque de texto del hero.
  hero: {
    mask: "radial-gradient(120% 90% at 74% 16%, #000 30%, transparent 82%)",
    opacity: 0.06,
  },
  // Girado 180 grados: el mismo dibujo, ahora abajo a la izquierda. Un punto
  // mas tenue porque en contacto hay menos texto que lo tape.
  contact: {
    transform: "rotate(180 600 400)",
    mask: "radial-gradient(120% 90% at 26% 84%, #000 30%, transparent 82%)",
    opacity: 0.045,
  },
};

export interface NauticalChartProps {
  variant?: "hero" | "contact";
  /** Sobreescribe la opacidad del trazo (por defecto 0.06 / 0.045). */
  opacity?: number;
  className?: string;
}

/**
 * Fondo grafico. El contenedor padre tiene que ser `relative`.
 *
 * Nunca provoca scroll horizontal: el div recorta con `overflow-hidden` y el
 * <svg> recorta ademas contra su propio viewport, asi que los anillos grandes
 * (que se salen del viewBox a proposito) no ocupan layout.
 */
export function NauticalChart({ variant = "hero", opacity, className }: NauticalChartProps) {
  const config = VARIANTS[variant];

  const style: CSSProperties = {
    opacity: opacity ?? config.opacity,
    maskImage: config.mask,
    WebkitMaskImage: config.mask,
  };

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      style={style}
    >
      <svg
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        focusable="false"
      >
        <g
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1"
          // Sin esto el trazo engorda con el escalado de `slice` y en una
          // pantalla ancha pasa de hairline a linea gruesa.
          vectorEffect="non-scaling-stroke"
          transform={config.transform}
        >
          {ISOBATHS.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
      </svg>
    </div>
  );
}
