using System;

namespace LuminosityWebAPI.Domain
{
    public class Veiculo
    {
        public Veiculo()
        {
            this.VEI_DAT_REGISTRO = DateTime.Now;
        }

        public int VEI_INT_ID { get; set; }
        public string VEI_STR_MODELO { get; set; }
        public string VEI_STR_MARCA { get; set; }
        public string VEI_STR_KM { get; set; }
        public string VEI_DAT_ANO { get; set; }
        public string VEI_STR_PLACA { get; set; }
        public string VEI_STR_STATUS { get; set; }
        public DateTime VEI_DAT_REGISTRO { get; set; }

        public override string ToString()
        {
            return this.VEI_STR_MODELO;
        }

    }
}
