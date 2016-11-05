using System;

namespace LuminosityWebAPI.Domain
{
    public class Cliente
    {
        public Cliente()
        {
            this.CLI_DAT_REGISTRO = DateTime.Now;
        }
        public int CLI_INT_ID { get; set; }
        public string CLI_STR_NOME { get; set; }
        public string CLI_STR_SOBRENOME { get; set; }
        public string CLI_STR_EMAIL { get; set; }
        public string CLI_STR_CPF { get; set; }
        public string CLI_STR_TEL { get; set; }
        public string CLI_STR_CEL { get; set; }
        public string CLI_DAT_NASCIMENTO { get; set; }
        public DateTime CLI_DAT_REGISTRO { get; set; }
        public string CLI_STR_ENDRECO { get; set; }


        public override string ToString()
        {
            return this.CLI_STR_NOME;
        }
    }
}
