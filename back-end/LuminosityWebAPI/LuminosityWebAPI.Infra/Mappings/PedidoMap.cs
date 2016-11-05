using LuminosityWebAPI.Domain;
using System.Data.Entity.ModelConfiguration;


namespace LuminosityWebAPI.Infra.Mappings
{
    class PedidoMap : EntityTypeConfiguration<Pedido>
    {
        public PedidoMap()
        {
            ToTable("Pedido");

            HasKey(x => x.PED_INT_ID);

            Property(x => x.PED_DAT_RETORNO).IsRequired();
            Property(x => x.PED_DAT_REGISTRO).IsRequired();
            Property(x => x.PED_STR_STATUS).IsRequired();

            HasRequired(x => x.Veiculo);
            HasRequired(x => x.Cliente);
            HasRequired(x => x.Funcionario);
        }
    }
}
