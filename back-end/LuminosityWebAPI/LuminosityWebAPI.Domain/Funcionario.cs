using System;

namespace LuminosityWebAPI.Domain
{
    public class Funcionario
    {
        public Funcionario()
        {
            this.FUN_DAT_REGISTRO = DateTime.Now;
        }
        public int FUN_INT_ID { get; set; }
        public string FUN_STR_NOME { get; set; }
        public string FUN_STR_SOBRENOME { get; set; }
        public string FUN_STR_EMAIL { get; set; }
        public string FUN_STR_SENHA { get; set; }
        public string FUN_STR_CPF { get; set; }
        public string FUN_STR_TEL { get; set; }
        public string FUN_STR_CEL { get; set; }
        public string FUN_DAT_NASCIMENTO { get; set; }
        public DateTime FUN_DAT_REGISTRO { get; set; }
        public string FUN_STR_LOGINHASH { get; set; }
        public int FUN_INT_ACESSO { get; set; }
        public string FUN_STR_ENDRECO { get; set; }


        public override string ToString()
        {
            return this.FUN_STR_NOME;
        }
    }
}
