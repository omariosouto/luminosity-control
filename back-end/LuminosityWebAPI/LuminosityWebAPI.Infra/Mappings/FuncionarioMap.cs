using LuminosityWebAPI.Domain;
using System.Data.Entity.ModelConfiguration;

namespace LuminosityWebAPI.Infra.Mappings
{
    public class FuncionarioMap : EntityTypeConfiguration<Funcionario>
    {
        public FuncionarioMap()
        {
            ToTable("Funcionario");

            HasKey(x => x.FUN_INT_ID);
            Property(x => x.FUN_STR_NOME).HasMaxLength(50).IsRequired();
            Property(x => x.FUN_STR_SOBRENOME).HasMaxLength(60).IsRequired();
            Property(x => x.FUN_STR_EMAIL).HasMaxLength(60).IsRequired();
            Property(x => x.FUN_STR_SENHA).HasMaxLength(40).IsRequired();
            Property(x => x.FUN_STR_CPF).HasMaxLength(14).IsRequired();
            Property(x => x.FUN_STR_TEL).HasMaxLength(15).IsRequired();
            Property(x => x.FUN_STR_CEL).HasMaxLength(15).IsRequired();
            Property(x => x.FUN_DAT_NASCIMENTO).IsRequired();
            Property(x => x.FUN_DAT_REGISTRO).IsRequired();
            Property(x => x.FUN_STR_LOGINHASH).HasMaxLength(40);
            Property(x => x.FUN_INT_ACESSO).IsRequired();
            Property(x => x.FUN_STR_ENDRECO).HasMaxLength(150).IsRequired();
        }
    }
}
