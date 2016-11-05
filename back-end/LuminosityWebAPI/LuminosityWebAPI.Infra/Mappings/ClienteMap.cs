using LuminosityWebAPI.Domain;
using System.Data.Entity.ModelConfiguration;

namespace LuminosityWebAPI.Infra.Mappings
{
    public class ClienteMap : EntityTypeConfiguration<Cliente>
    {
        public ClienteMap()
        {
            ToTable("Cliente");

            HasKey(x => x.CLI_INT_ID);
            Property(x => x.CLI_STR_NOME).HasMaxLength(50).IsRequired();
            Property(x => x.CLI_STR_SOBRENOME).HasMaxLength(60).IsRequired();
            Property(x => x.CLI_STR_EMAIL).HasMaxLength(60).IsRequired();
            Property(x => x.CLI_STR_CPF).HasMaxLength(14).IsRequired();
            Property(x => x.CLI_STR_TEL).HasMaxLength(15).IsRequired();
            Property(x => x.CLI_STR_CEL).HasMaxLength(15).IsRequired();
            Property(x => x.CLI_DAT_REGISTRO).IsRequired();
            Property(x => x.CLI_DAT_NASCIMENTO).IsRequired();
            Property(x => x.CLI_STR_ENDRECO).HasMaxLength(150).IsRequired();

        }
    }
}
