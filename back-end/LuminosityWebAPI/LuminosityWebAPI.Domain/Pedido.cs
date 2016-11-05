using System;

namespace LuminosityWebAPI.Domain
{
    public class Pedido
    {
        public Pedido()
        {
            this.PED_DAT_REGISTRO = DateTime.Now;
        }
        public int PED_INT_ID { get; set; }
        public DateTime PED_DAT_REGISTRO { get; set; }
        public string PED_STR_STATUS { get; set; }
        public string PED_DAT_RETORNO { get; set; }
        public int VEI_INT_ID { get; set; }
        public virtual Veiculo Veiculo { get; set; }
        public int CLI_INT_ID { get; set; }
        public virtual Cliente Cliente { get; set; }
        public int FUN_INT_ID { get; set; }
        public virtual Funcionario Funcionario { get; set; }




    }
}
